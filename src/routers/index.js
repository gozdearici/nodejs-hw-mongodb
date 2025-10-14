import { Router } from 'express';
import authRouter from './auth.js';
import contactsRouter from './contacts.js';

const router = Router();

router.use('/api', contactsRouter);
router.use('/auth', authRouter);

export default router;
