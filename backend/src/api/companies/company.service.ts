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

// --- Service functions for company managers managing their drivers ---
export const getDriversByCompany = async (companyId: number) => {
    if (!companyId) {
        throw new AppError('Company manager is not associated with a company.', 400);
    }
    const [rows] = await pool.query("SELECT id, name, email, phone_number, status, avatar_url, assigned_bus_id FROM users WHERE role = 'driver' AND company_id = ?", [companyId]);
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
