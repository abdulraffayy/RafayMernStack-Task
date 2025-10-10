import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/Usercontroller';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);



export default router;

