import { Response, NextFunction } from 'express';
import * as authService from './auth.service';
import asyncHandler from '../../utils/asyncHandler';

// FIX: Removed local asyncHandler and explicit types to use the global handler, which now correctly infers types.
export const register = asyncHandler(async (req, res: any) => {
    const { name, email, password, phone } = req.body;
    const { user, token } = await authService.registerUser({ name, email, password, phone });
    res.status(201).json({ success: true, token, data: user });
});

// FIX: Removed explicit types to allow for correct type inference.
export const login = asyncHandler(async (req, res: any) => {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser({ email, password });
    res.status(200).json({ success: true, token, data: user });
});

// FIX: Removed explicit types and correctly return req.user for the authenticated user's data.
export const getMe = asyncHandler(async (req: any, res: any) => {
    // req.user is attached by the 'protect' middleware
    const user = req.user; 
    res.status(200).json({ success: true, data: user });
});

export const updatePassword = asyncHandler(async (req: any, res: any) => {
    const { currentPassword, newPassword } = req.body;
    await authService.updatePassword(req.user.id, currentPassword, newPassword);
    res.status(200).json({ success: true, message: 'Password updated successfully' });
});