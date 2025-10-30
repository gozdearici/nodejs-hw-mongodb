import fs from 'node:fs/promises';
import path from 'node:path';
import {
  APP_DOMAIN,
  TEMPLATES_UPLOAD_DIR,
  UPLOAD_DIR,
} from '../constants/constants.js';
import { env } from './env.js';

export const saveFileUploads = async (file) => {
  await fs.rename(
    path.join(TEMPLATES_UPLOAD_DIR, file.filename),
    path.join(UPLOAD_DIR, file.originalname),
  );

  return `${env(APP_DOMAIN)}/uploads/${file.originalname}`;
};
