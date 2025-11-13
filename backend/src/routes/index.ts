import { Router } from 'express';
import authRoutes from '../api/auth/auth.routes';
import adminRoutes from '../api/admin/admin.routes';
import tripRoutes from '../api/trips/trip.routes';
import bookingRoutes from '../api/bookings/booking.routes';
import companyRoutes from '../api/companies/company.routes';
import debugRoutes from '../api/debug/debug.routes';
import walletRoutes from '../api/wallet/wallet.routes';
import messageRoutes from '../api/messages/message.routes';
import settingsRoutes from '../api/settings/settings.routes';
import destinationRoutes from '../api/destinations/destinations.routes';
import driverRoutes from '../api/drivers/driver.routes';
import agentRoutes from '../api/agent/agent.routes';
import paymentRoutes from '../api/payments/payments.routes';

const router = Router();

// Mount all resource routers
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/trips', tripRoutes);
router.use('/bookings', bookingRoutes);
router.use('/companies', companyRoutes);
router.use('/debug', debugRoutes);
router.use('/wallet', walletRoutes);
router.use('/messages', messageRoutes);
router.use('/settings', settingsRoutes);
router.use('/destinations', destinationRoutes);
router.use('/drivers', driverRoutes);
router.use('/agents', agentRoutes);
router.use('/payments', paymentRoutes);


export default router;
