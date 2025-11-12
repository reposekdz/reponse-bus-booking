

import express from 'express';
import cors from 'cors';
import apiRouter from './routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();

// Core Middleware
app.use(cors());
// FIX: To resolve "No overload matches this call" and type conflict errors,
// explicit type imports for Request/Response were removed from the 'express' import.
// This allows TypeScript to correctly infer the types for middleware.
// The redundant '/' path argument is also removed for cleaner code.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/v1', apiRouter);

// Health Check
// FIX: Removed explicit types from 'req' and 'res' to rely on type inference,
// which resolves type conflicts and aligns with the fix at the import level.
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});

// 404 Handler
// FIX: Removed explicit types from 'req' and 'res' to rely on type inference.
app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

// Global Error Handler
app.use(errorHandler);

export default app;
