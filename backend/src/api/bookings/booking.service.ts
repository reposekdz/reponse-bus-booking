
import { pool } from '../../config/db';
import { AppError } from '../../utils/AppError';
import * as mysql from 'mysql2/promise';

interface BookingDetails {
    tripId: string;
    seats: string[];
    paymentMethod: string;
    totalPrice: number;
}

export const createBooking = async (userId: number, details: BookingDetails) => {
    const { tripId, seats, paymentMethod, totalPrice } = details;
    
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
        const [tripRows] = await connection.query<any[] & mysql.RowDataPacket[]>(`
            SELECT t.status, b.capacity, r.base_price 
            FROM trips t 
            JOIN buses b ON t.bus_id = b.id
            JOIN routes r ON t.route_id = r.id
            WHERE t.id = ? FOR UPDATE`, [tripId]); // Lock the trip row
        
        if (tripRows.length === 0) throw new AppError('Trip not found', 404);
        const trip = tripRows[0];
        if (trip.status !== 'Scheduled') throw new AppError('This trip is no longer available for booking', 400);

        // --- Critical Section: Check Seat Availability ---
        const [bookedSeats] = await connection.query('SELECT seat_number FROM seats WHERE trip_id = ?', [tripId]);
        const bookedSeatSet = new Set((bookedSeats as any[]).map(s => s.seat_number));

        for (const seat of seats) {
            if (bookedSeatSet.has(seat)) {
                throw new AppError(`Seat ${seat} is not available`, 409);
            }
        }
        
        // --- Payment Processing Simulation ---
        if (paymentMethod === 'Wallet') {
            const [walletResult] = await connection.query<mysql.OkPacket>('UPDATE wallets SET balance = balance - ? WHERE user_id = ? AND balance >= ?', [totalPrice, userId, totalPrice]);
            if (walletResult.affectedRows === 0) {
                throw new AppError('Insufficient wallet balance', 400);
            }
        }

        const bookingId = `GB-${Date.now().toString().slice(-6)}`;
        const [bookingResult] = await connection.query<mysql.ResultSetHeader>(
            'INSERT INTO bookings (user_id, trip_id, booking_id, total_price, status) VALUES (?, ?, ?, ?, ?)',
            [userId, tripId, bookingId, totalPrice, 'Confirmed']
        );
        const newBookingId = bookingResult.insertId;

        const seatInsertPromises = seats.map(seat => 
            connection.query('INSERT INTO seats (booking_id, trip_id, seat_number) VALUES (?, ?, ?)', [newBookingId, tripId, seat])
        );
        await Promise.all(seatInsertPromises);

        await connection.commit();
        
        return {
            bookingId: bookingId,
            seats: seats,
            totalPrice: totalPrice,
            createdAt: new Date().toISOString()
        };

    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

export const getBookingsForUser = async (userId: number) => {
    const [rows] = await pool.query(`
        SELECT 
            b.id as _id, b.booking_id, b.total_price, b.created_at,
            GROUP_CONCAT(s.seat_number) as seats,
            t.departure_time, t.arrival_time,
            r.origin, r.destination,
            c.name as company_name
        FROM bookings b
        JOIN trips t ON b.trip_id = t.id
        JOIN routes r ON t.route_id = r.id
        JOIN companies c ON r.company_id = c.id
        JOIN seats s ON b.id = s.booking_id
        WHERE b.user_id = ?
        GROUP BY b.id
        ORDER BY t.departure_time DESC
    `, [userId]);
    
    // Re-structure to match frontend expectations
    return (rows as any[]).map(row => ({
        _id: row._id,
        bookingId: row.booking_id,
        totalPrice: row.total_price,
        seats: row.seats.split(','),
        trip: {
            departureTime: row.departure_time,
            arrivalTime: row.arrival_time,
            route: {
                from: row.origin,
                to: row.destination,
                company: {
                    name: row.company_name
                }
            }
        }
    }));
};
