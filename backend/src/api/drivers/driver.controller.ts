import * as driverService from './driver.service';
import asyncHandler from '../../utils/asyncHandler';

export const getMyTripHistory = asyncHandler(async (req, res) => {
    const history = await driverService.getTripHistoryForDriver(req.user!.id);
    res.status(200).json({ success: true, data: history });
});
