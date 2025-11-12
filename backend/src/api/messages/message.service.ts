import Message from './message.model';
import { AppError } from '../../utils/AppError';

export const createMessage = async (data: any) => {
    const { name, email, subject, message } = data;
    if (!name || !email || !subject || !message) {
        throw new AppError('Please provide all required fields.', 400);
    }
    return Message.create({ name, email, subject, message });
};

export const getAllMessages = async () => {
    return Message.find().sort({ createdAt: -1 });
};

export const updateMessage = async (id: string, data: any) => {
    const message = await Message.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    });
    if (!message) {
        throw new AppError('Message not found.', 404);
    }
    return message;
};