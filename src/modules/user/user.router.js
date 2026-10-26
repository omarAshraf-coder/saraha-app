import { Router } from 'express';
import { signup, signin, sendOtp } from './user.controller.js';

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/send-otp', sendOtp);

export default router;