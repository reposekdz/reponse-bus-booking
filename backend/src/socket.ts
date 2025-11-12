import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import config from './config';
import logger from './utils/logger';
import { IUser } from './api/users/user.model';

export const initSocket = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        logger.info(`Socket connected: ${socket.id}`);

        socket.on('authenticate', (token: string) => {
            if (!token) {
                return;
            }
            try {
                const decoded = jwt.verify(token, config.jwt.secret) as { id: string };
                // Join a room specific to the user ID
                socket.join(decoded.id);
                logger.info(`Socket ${socket.id} authenticated for user ${decoded.id}`);
            } catch (error) {
                logger.warn(`Socket authentication failed for ${socket.id}: ${(error as Error).message}`);
            }
        });

        socket.on('disconnect', () => {
            logger.info(`Socket disconnected: ${socket.id}`);
        });
    });
};