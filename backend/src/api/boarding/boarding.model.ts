import mongoose from 'mongoose';

const BoardingSchema = new mongoose.Schema({
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true,
    },
    passenger: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    trip: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip',
        required: true,
    },
    boardedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true
});

export default mongoose.model('Boarding', BoardingSchema);