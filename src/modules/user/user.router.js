import { Router } from 'express';
import { signup, signin, enableTwoStepVerification, loginConfirmation, sendOtp } from './user.controller.js';
import { auth } from '../../middleware/auth.middleware.js';

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.patch('/enable-2sv', auth, enableTwoStepVerification);
router.post('/login-confirmation', loginConfirmation);
router.post('/send-otp', sendOtp);

export default router;