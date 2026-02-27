import { Router } from 'express';
import { LayoutController } from '../controllers/LayoutController';
import { AuthMiddleware } from '../middleware/auth';

const router = Router();

// Header routes
router.get('/header', AuthMiddleware.authenticate, LayoutController.getHeader);
router.put('/header', AuthMiddleware.authenticate, LayoutController.updateHeader);

// Footer routes
router.get('/footer', AuthMiddleware.authenticate, LayoutController.getFooter);
router.put('/footer', AuthMiddleware.authenticate, LayoutController.updateFooter);

export default router;