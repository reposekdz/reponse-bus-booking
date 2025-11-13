import { Router } from 'express';
import { getMyTripHistory, getMyTrips } from './driver.controller';
import { protect, authorize } from '../../middleware/auth.middleware';

const router = Router();

// All routes here are for authenticated drivers
router.use(protect, authorize('driver'));

router.get('/my-history', getMyTripHistory);
router.get('/my-trips', getMyTrips);

export default router;