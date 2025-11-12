import { pool } from '../../config/db';
import { AppError } from '../../utils/AppError';
import * as mysql from 'mysql2/promise';

export const topUpUserWallet = async (userId: number, amount: number) => {
    if (!amount || amount <= 0) {
        throw new AppError('Please provide a valid amount to top up.', 400);
    }
    
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
        // Find or create wallet
        const [walletRows] = await connection.query<any[] & mysql.RowDataPacket[]>('SELECT id FROM wallets WHERE user_id = ?', [userId]);
        let walletId;
        if (walletRows.length > 0) {
            walletId = walletRows[0].id;
        } else {
            const [result] = await connection.query<mysql.ResultSetHeader>('INSERT INTO wallets (user_id, balance) VALUES (?, 0)', [userId]);
            walletId = result.insertId;
        }

        // In a real scenario, this would come after a successful payment gateway response.
        await connection.query('UPDATE wallets SET balance = balance + ? WHERE id = ?', [amount, walletId]);

        await connection.query(
            'INSERT INTO wallet_transactions (wallet_id, amount, type, description) VALUES (?, ?, ?, ?)',
            [walletId, amount, 'deposit', 'User-initiated wallet top-up']
        );
        
        await connection.commit();
        
        const [userRows] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
        return (userRows as any)[0];

    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

export const getUserWalletHistory = async (userId: number) => {
    const [rows] = await pool.query(`
        SELECT wt.* 
        FROM wallet_transactions wt
        JOIN wallets w ON wt.wallet_id = w.id
        WHERE w.user_id = ?
        ORDER BY wt.created_at DESC
    `, [userId]);
    return rows;
};
