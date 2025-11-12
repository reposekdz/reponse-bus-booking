import { Router } from 'express';
import { searchTrips, getTripById, confirmBoarding } from './trip.controller';
import { protect, authorize } from '../../middleware/auth.middleware';


const router = Router();

// @route   GET /api/v1/trips/search
// @desc    Search for available trips
// @access  Public
router.get('/search', searchTrips);

// @route   GET /api/v1/trips/:id
// @desc    Get a single trip by its ID
// @access  Public
router.get('/:id', getTripById);

// @route   POST /api/v1/trips/:tripId/boardings
// @desc    Confirm a passenger has boarded
// @access  Driver
router.post('/:tripId/boardings', protect, authorize('driver'), confirmBoarding);


export default router;