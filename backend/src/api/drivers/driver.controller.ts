import * as driverService from './driver.service';
import asyncHandler from '../../utils/asyncHandler';

export const getMyTripHistory = asyncHandler(async (req, res) => {
    const history = await driverService.getTripHistoryForDriver(req.user!.id);
    res.status(200).json({ success: true, data: history });
});

export const getMyTrips = asyncHandler(async (req, res) => {
    const trips = await driverService.getTripsForDriver(req.user!.id);
    res.status(200).json({ success: true, data: trips });
});

export const updateMyStatus = asyncHandler(async (req, res) => {
    const { status } = req.body; // Expecting 'Active' or 'Unavailable'
    const updatedStatus = await driverService.updateDriverStatus(req.user!.id, status);
    res.status(200).json({ success: true, data: updatedStatus });
});