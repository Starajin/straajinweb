import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { AuthMiddleware } from '../middleware/auth';

const router = Router();

// Public routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/refresh-token', AuthController.refreshToken);

// Protected routes
router.get('/profile', AuthMiddleware.authenticate, AuthController.getProfile);
router.put('/profile', AuthMiddleware.authenticate, AuthController.updateProfile);
router.post('/change-password', AuthMiddleware.authenticate, AuthController.changePassword);

export default router;