import { Router } from 'express';
import { validationBody } from '../middlewares/validateBody.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
} from '../controllers/auth.js';
import { getBasicServerController } from '../controllers/contacts.js';

const authRouter = Router();

authRouter.get('/register', ctrlWrapper(getBasicServerController));

authRouter.get('/login', ctrlWrapper(getBasicServerController));

authRouter.get('/logout', ctrlWrapper(getBasicServerController));

authRouter.get('/refresh', ctrlWrapper(getBasicServerController));

authRouter.post(
  '/register',
  validationBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

authRouter.post(
  '/login',
  validationBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post('/logout', ctrlWrapper(logoutUserController));

authRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));

export default authRouter;
