
import { pool } from '../../config/db';
import { AppError } from '../../utils/AppError';
import * as mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

export const getAllCompanies = async () => {
    const [rows] = await pool.query("SELECT id, name, logo_url, description, cover_url FROM companies WHERE status = 'Active'");
    return rows;
};

export const getCompanyById = async (id: string) => {
    const [rows] = await pool.query('SELECT * FROM companies WHERE id = ?', [id]);
    if ((rows as any[]).length === 0) {
        throw new AppError('Company not found', 404);
    }
    return (rows as any)[0];
};

export const getCompanyDetailsById = async (id: string) => {
    const companyId = parseInt(id, 10);
    if (isNaN(companyId)) {
        throw new AppError('Invalid company ID', 400);
    }

    const [companyRows] = await pool.query<any[] & mysql.RowDataPacket[]>('SELECT * FROM companies WHERE id = ?', [companyId]);
    if (companyRows.length === 0) {
        throw new AppError('Company not found', 404);
    }
    const company = companyRows[0];

    const [fleet] = await pool.query('SELECT * FROM buses WHERE company_id = ?', [companyId]);
    const [routes] = await pool.query('SELECT *, origin as `from`, destination as `to` FROM routes WHERE company_id = ?', [companyId]);
    const [services] = await pool.query('SELECT * FROM services WHERE company_id = ?', [companyId]);
    const [promotions] = await pool.query('SELECT * FROM promotions WHERE company_id = ?', [companyId]);
    const [gallery] = await pool.query("SELECT image_url as src, category FROM gallery WHERE company_id = ?", [companyId]);
    const [reviews] = await pool.query(`
        SELECT r.rating, r.comment, u.name as author 
        FROM reviews r 
        JOIN users u ON r.user_id = u.id 
        WHERE r.company_id = ?
    `, [companyId]);
    
    // Simple stats mocks for now, real implementation would require complex aggregation
    const stats = { passengers: '2M+', fleet: (fleet as any[]).length, routes: (routes as any[]).length };
    
    // Mock schedule for now
    const schedule = {
      'Kigali-Rubavu': [
        { time: '07:00', arrival: '10:30', bus: 'Yutong Explorer', price: '4,500 RWF' },
      ]
    };

    return {
        ...company,
        fleet,
        routes,
        services,
        promotions,
        gallery,
        reviews,
        stats,
        schedule
    };
};


// --- Service functions for company managers managing their drivers ---
export const getDriversByCompany = async (companyId: number) => {
    if (!companyId) {
        throw new AppError('Company manager is not associated with a company.', 400);
    }
    const [rows] = await pool.query(`
        SELECT 
            u.id, u.name, u.email, u.phone_number, u.status, u.avatar_url, u.assigned_bus_id,
            c.name as company_name
        FROM users u
        LEFT JOIN companies c ON u.company_id = c.id
        WHERE u.role = 'driver' AND u.company_id = ?
    `, [companyId]);
    return rows;
};

export const createDriver = async (driverData: any, companyId: number) => {
    const { name, email, password, phone } = driverData;
    
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if ((existing as any[]).length > 0) {
        throw new AppError('A user with this email already exists.', 400);
    }

    const password_hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query<mysql.ResultSetHeader>(
        'INSERT INTO users (name, email, password_hash, phone_number, role, company_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, email, password_hash, phone, 'driver', companyId, 'Active']
    );
    
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
    const driver = (rows as any)[0];
    delete driver.password_hash;
    return driver;
};

export const updateDriver = async (driverId: string, updateData: any, companyId: number) => {
    const { name, phone, status } = updateData;
    const [result] = await pool.query<mysql.OkPacket>(
        'UPDATE users SET name = ?, phone_number = ?, status = ? WHERE id = ? AND company_id = ? AND role = "driver"',
        [name, phone, status, driverId, companyId]
    );

    if (result.affectedRows === 0) {
        throw new AppError('Driver not found or you do not have permission to edit this driver.', 404);
    }
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [driverId]);
    return (rows as any)[0];
};

export const deleteDriver = async (driverId: string, companyId: number) => {
    const [result] = await pool.query<mysql.OkPacket>(
        'DELETE FROM users WHERE id = ? AND company_id = ? AND role = "driver"',
        [driverId, companyId]
    );
    if (result.affectedRows === 0) {
        throw new AppError('Driver not found or you do not have permission to delete this driver.', 404);
    }
    return;
};
