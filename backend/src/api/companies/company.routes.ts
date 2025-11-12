
import { Router } from 'express';
import { getCompanies, getCompanyById, getMyDrivers, createDriverForMyCompany, updateDriverForMyCompany, deleteDriverForMyCompany, getCompanyDetails } from './company.controller';
import { protect, authorize } from '../../middleware/auth.middleware';

const router = Router();

// Public routes
router.route('/').get(getCompanies);
router.route('/:id').get(getCompanyById);
router.route('/:id/details').get(getCompanyDetails); // New detailed endpoint

// Protected routes for company managers
router.route('/mydrivers')
    .get(protect, authorize('company'), getMyDrivers)
    .post(protect, authorize('company'), createDriverForMyCompany);
    
router.route('/mydrivers/:id')
    .put(protect, authorize('company'), updateDriverForMyCompany)
    .delete(protect, authorize('company'), deleteDriverForMyCompany);


export default router;
