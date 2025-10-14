import createHttpError from 'http-errors';
import { UsersCollection } from '../db/model/userModel.js';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { SessionCollection } from '../db/model/sessionModel.js';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/constants.js';

export const registerUser = async (payload) => {
  const userExists = await UsersCollection.findOne({
    email: payload.email,
  });
  if (userExists) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) throw createHttpError(404, 'User not found');

  const isPasswordValid = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordValid)
    throw createHttpError(401, 'Email or password is wrong');

  await SessionCollection.deleteOne({ user: user._id });

  const session = createSession();
  return await SessionCollection.create({
    ...session,
    userId: user._id,
  });
};

export const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = new Date(Date.now() + FIFTEEN_MINUTES);
  const refreshTokenValidUntil = new Date(Date.now() + ONE_DAY);

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  };
};

export const logoutUser = async (sessionId) => {
  await SessionCollection.deleteOne({ _id: sessionId });
};

export const refreshUserSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionCollection.findById({
    _id: sessionId,
    refreshToken,
  });
  if (!session) throw createHttpError(401, 'Unauthorized');

  if (session.refreshTokenValidUntil < new Date()) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = createSession();

  await SessionCollection.deleteOne({ _id: sessionId, refreshToken });

  return await SessionCollection.create({
    userId: session.userId,
    ...newSession,
  });
};
