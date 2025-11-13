import * as bookingService from './booking.service';
import asyncHandler from '../../utils/asyncHandler';

export const createBooking = asyncHandler(async (req, res) => {
    const bookingDetails = {
        tripId: req.body.tripId,
        seats: req.body.seats,
        paymentMethod: req.body.paymentMethod,
        totalPrice: req.body.totalPrice,
        pin: req.body.pin, // Added pin for wallet transactions
    };

    const booking = await bookingService.createBooking(req.user!.id, bookingDetails);
    
    res.status(201).json({
        success: true,
        data: booking
    });
});

export const getMyBookings = asyncHandler(async (req, res) => {
    const bookings = await bookingService.getBookingsForUser(req.user!.id);

    res.status(200).json({
        success: true,
        count: bookings.length,
        data: bookings
    });
});