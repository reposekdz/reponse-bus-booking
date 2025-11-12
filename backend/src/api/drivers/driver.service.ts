import { pool } from '../../config/db';
import * as mysql from 'mysql2/promise';

export const getTripHistoryForDriver = async (driverId: number) => {
    const [rows] = await pool.query<any[] & mysql.RowDataPacket[]>(`
        SELECT
            t.id,
            CONCAT(r.origin, ' - ', r.destination) as route,
            t.departure_time as date,
            t.status,
            (SELECT COUNT(*) FROM bookings bk WHERE bk.trip_id = t.id AND bk.status != 'Cancelled') as passengers
        FROM trips t
        JOIN routes r ON t.route_id = r.id
        WHERE t.driver_id = ?
        ORDER BY t.departure_time DESC;
    `, [driverId]);

    return rows.map(trip => ({
        ...trip,
        status: trip.status.charAt(0).toUpperCase() + trip.status.slice(1) // Capitalize status
    }));
};
