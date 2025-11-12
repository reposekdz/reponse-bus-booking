import { pool } from '../../config/db';
import { AppError } from '../../utils/AppError';
import { io } from '../../server';
import * as mysql from 'mysql2/promise';

interface TripQuery {
    from: string;
    to: string;
    date: string;
}

// Function to get available seats for multiple trips efficiently
async function getAvailableSeatsForTrips(tripIds: number[]) {
    if (tripIds.length === 0) {
        return {};
    }
    const placeholders = tripIds.map(() => '?').join(',');
    const [seatCounts] = await pool.query(`
        SELECT t.id as trip_id, b.capacity, COUNT(s.id) as booked_seats
        FROM trips t
        JOIN buses b ON t.bus_id = b.id
        LEFT JOIN seats s ON t.id = s.trip_id
        WHERE t.id IN (${placeholders})
        GROUP BY t.id, b.capacity
    `, tripIds);

    const availableSeatsMap = {};
    (seatCounts as any[]).forEach(row => {
        availableSeatsMap[row.trip_id] = row.capacity - row.booked_seats;
    });
    return availableSeatsMap;
}


export const findTrips = async (query: TripQuery) => {
    const { from, to, date } = query;

    if (!from || !to || !date) {
        throw new AppError('Please provide from, to, and date query parameters.', 400);
    }
    
    const [trips] = await pool.query(`
        SELECT 
            t.id, t.departure_time, t.arrival_time,
            r.base_price, r.estimated_duration_minutes,
            c.name as company_name, c.logo_url,
            b.model, b.amenities,
            d.name as driver_name, d.avatar_url
        FROM trips t
        JOIN routes r ON t.route_id = r.id
        JOIN companies c ON r.company_id = c.id
        JOIN buses b ON t.bus_id = b.id
        JOIN users d ON t.driver_id = d.id
        WHERE r.origin = ? AND r.destination = ? AND DATE(t.departure_time) = ? AND t.status = 'Scheduled'
    `, [from, to, date]);

    const tripIds = (trips as any[]).map(t => t.id);
    const availableSeatsMap = await getAvailableSeatsForTrips(tripIds);

    // Re-structure data to match frontend expectations
    const formattedTrips = (trips as any[]).map(trip => ({
        _id: trip.id,
        departureTime: trip.departure_time,
        arrivalTime: trip.arrival_time,
        availableSeats: availableSeatsMap[trip.id] || 0,
        route: {
            basePrice: trip.base_price,
            estimatedDurationMinutes: trip.estimated_duration_minutes,
            company: {
                name: trip.company_name,
                logoUrl: trip.logo_url,
            }
        },
        bus: {
            model: trip.model,
            amenities: trip.amenities,
        },
        driver: {
            name: trip.driver_name,
            avatarUrl: trip.avatar_url,
        }
    }));


    return formattedTrips;
};

export const findTripById = async (id: string) => {
    const [rows] = await pool.query(`
        SELECT 
            t.id, t.departure_time, t.arrival_time, t.status,
            r.origin, r.destination, r.base_price,
            b.id as bus_id, b.capacity,
            c.name as company_name
        FROM trips t
        JOIN routes r ON t.route_id = r.id
        JOIN buses b ON t.bus_id = b.id
        JOIN companies c ON r.company_id = c.id
        WHERE t.id = ?
    `, [id]);
    
    if ((rows as any[]).length === 0) {
        throw new AppError('Trip not found', 404);
    }
    const trip = (rows as any)[0];
    
    const [bookedSeats] = await pool.query('SELECT seat_number FROM seats WHERE trip_id = ?', [id]);
    const bookedSeatSet = new Set((bookedSeats as any[]).map(s => s.seat_number));

    const seatMap = {};
    for (let i = 1; i <= trip.capacity / 4; i++) {
        for (const char of ['A', 'B', 'C', 'D']) {
            const seatId = `${i}${char}`;
            seatMap[seatId] = bookedSeatSet.has(seatId) ? 'occupied' : 'available';
        }
    }
    
    // Re-structure to match frontend expectations
    return {
        _id: trip.id,
        departureTime: trip.departure_time,
        seatMap: seatMap,
        route: {
            from: trip.origin,
            to: trip.destination,
            basePrice: trip.base_price,
            company: { name: trip.company_name }
        },
        bus: { capacity: trip.capacity }
    };
};


interface BoardingData {
    driverId: number;
    tripId: string;
    ticketId: string;
}

export const confirmPassengerBoarding = async (data: BoardingData) => {
    const { driverId, tripId, ticketId } = data;

    const [bookingRows] = await pool.query<any[] & mysql.RowDataPacket[]>(`
        SELECT b.id, b.status, u.id as passenger_id, u.name as passenger_name, GROUP_CONCAT(s.seat_number) as seats
        FROM bookings b
        JOIN users u ON b.user_id = u.id
        JOIN seats s ON b.id = s.booking_id
        WHERE b.booking_id = ? AND b.trip_id = ?
        GROUP BY b.id, u.id, u.name
    `, [ticketId, tripId]);

    if (bookingRows.length === 0) {
        throw new AppError('Invalid ticket ID for this trip.', 404);
    }
    const booking = bookingRows[0];

    if (booking.status === 'Completed') {
        throw new AppError(`${booking.passenger_name} has already boarded.`, 409);
    }
    
    const [tripRows] = await pool.query<any[] & mysql.RowDataPacket[]>('SELECT driver_id, origin, destination FROM trips JOIN routes ON trips.route_id = routes.id WHERE trips.id = ?', [tripId]);
    if (tripRows.length === 0 || tripRows[0].driver_id !== driverId) {
        throw new AppError('You are not authorized to manage this trip.', 403);
    }
    const trip = tripRows[0];
    
    await pool.query('UPDATE bookings SET status = "Completed" WHERE id = ?', [booking.id]);
    
    const message = `Welcome, ${booking.passenger_name}! You have successfully boarded the bus for ${trip.origin} to ${trip.destination}.`;
    io.to(booking.passenger_id.toString()).emit('passengerBoarded', {
        message: message,
        route: `${trip.origin} to ${trip.destination}`
    });

    return {
        passengerName: booking.passenger_name,
        seat: booking.seats,
    };
};
