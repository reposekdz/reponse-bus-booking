import express from 'express';
import cors from 'cors';
import apiRouter from './routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();

// Core Middleware
// Configure CORS for production readiness
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));
app.use(express.json() as express.RequestHandler);
app.use(express.urlencoded({ extended: true }) as express.RequestHandler);

// API Routes
app.use('/api/v1', apiRouter);

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

// Global Error Handler
app.use(errorHandler);

export default app;
