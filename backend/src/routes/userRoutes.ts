import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/Usercontroller';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route (will need auth middleware)
// router.get('/profile', authMiddleware, getUserProfile);

export default router;

