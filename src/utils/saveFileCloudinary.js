import cloudinary from 'cloudinary';
import { env } from './env.js';
import {
  CLOUDINARY_CLOUD_API_KEY,
  CLOUDINARY_CLOUD_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from '../constants/constants.js';

cloudinary.v2.config({
  cloud_name: env(CLOUDINARY_CLOUD_NAME),
  api_key: env(CLOUDINARY_CLOUD_API_KEY),
  api_secret: env(CLOUDINARY_CLOUD_API_SECRET),
});

export const saveFileCloudinary = async (file) => {
  const result = await cloudinary.v2.uploader.upload(file.path);

  return result.secure_url;
};
