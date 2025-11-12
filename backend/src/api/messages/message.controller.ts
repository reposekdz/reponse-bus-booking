
import { Response } from 'express';
import * as messageService from './message.service';
import asyncHandler from '../../utils/asyncHandler';

// FIX: Changed res type from Response to any to resolve property 'status' not existing.
export const createMessage = asyncHandler(async (req: any, res: any) => {
    const message = await messageService.createMessage(req.body);
    res.status(201).json({ success: true, data: message });
});

// FIX: Changed res type from Response to any to resolve property 'status' not existing.
export const getMessages = asyncHandler(async (req: any, res: any) => {
    const messages = await messageService.getAllMessages();
    res.status(200).json({ success: true, data: messages });
});

// FIX: Changed res type from Response to any to resolve property 'status' not existing.
export const updateMessage = asyncHandler(async (req: any, res: any) => {
    const message = await messageService.updateMessage(req.params.id, req.body);
    res.status(200).json({ success: true, data: message });
});
