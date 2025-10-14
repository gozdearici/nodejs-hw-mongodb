import { model, Schema } from 'mongoose';

const sessionModel = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    accessTokenValidUntil: {
      type: Date,
      default: Date.now,
      expires: '1d',
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      default: Date.now,
      expires: '1d',
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

export const SessionCollection = model('Session', sessionModel);
