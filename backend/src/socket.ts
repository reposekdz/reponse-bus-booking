
import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import config from './config';
import logger from './utils/logger';

export const initSocket = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        logger.info(`Socket connected: ${socket.id}`);

        // Listen for an authentication event from the client
        socket.on('authenticate', (token: string) => {
            if (!token) {
                logger.warn(`Socket ${socket.id} tried to authenticate without a token.`);
                return;
            }
            try {
                // Verify the JWT token
                const decoded = jwt.verify(token, config.jwt.secret) as { id: string };
                // If valid, have the socket join a room named after its user ID.
                // This allows us to easily target specific users for notifications.
                socket.join(decoded.id.toString());
                logger.info(`Socket ${socket.id} authenticated and joined room for user ${decoded.id}`);
            } catch (error) {
                logger.warn(`Socket authentication failed for ${socket.id}: ${(error as Error).message}`);
                // Optional: disconnect if auth fails
                // socket.disconnect();
            }
        });

        socket.on('disconnect', () => {
            logger.info(`Socket disconnected: ${socket.id}`);
        });
    });
};
