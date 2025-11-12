import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        trim: true,
    },
    subject: {
        type: String,
        required: [true, 'Please provide a subject'],
        trim: true,
    },
    message: {
        type: String,
        required: [true, 'Please provide a message'],
    },
    status: {
        type: String,
        enum: ['New', 'Read', 'Archived'],
        default: 'New',
    }
}, {
    timestamps: true
});

export default mongoose.model('Message', MessageSchema);