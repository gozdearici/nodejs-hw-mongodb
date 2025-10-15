import { Router } from 'express';
import authRouter from './auth.js';
import contactsRouter from './contacts.js';
import { authenticate } from '../middlewares/authenticate.js';
import { getBasicServerController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getBasicServerController));
router.use('/contacts', authenticate, contactsRouter);
router.use('/auth', authRouter);

export default router;
