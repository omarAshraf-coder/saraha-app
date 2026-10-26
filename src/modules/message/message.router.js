import { Router } from 'express';
import { sendAnonymousMessage, requestSenderIdentity } from './message.controller.js';

const router = Router();

router.post('/send', sendAnonymousMessage);
router.post('/request-identity', requestSenderIdentity);

export default router;