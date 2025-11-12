
import * as tripService from './trip.service';
import asyncHandler from '../../utils/asyncHandler';

// FIX: Removed explicit types to allow for correct type inference.
export const searchTrips = asyncHandler(async (req, res) => {
    const { from, to, date } = req.query;

    const query = {
        from: from as string,
        to: to as string,
        date: date as string,
    };
    
    const trips = await tripService.findTrips(query);

    res.status(200).json({
        success: true,
        count: trips.length,
        data: trips,
    });
});

export const getTripById = asyncHandler(async (req, res) => {
    const trip = await tripService.findTripById(req.params.id);
    res.status(200).json({
        success: true,
        data: trip
    });
});

export const confirmBoarding = asyncHandler(async (req, res) => {
    const { tripId } = req.params;
    const { ticketId } = req.body;
    const driverId = req.user._id;

    const result = await tripService.confirmPassengerBoarding({ driverId, tripId, ticketId });
    
    res.status(200).json({
        success: true,
        message: 'Passenger boarded successfully',
        data: result
    });
});
