import path from 'node:path';

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const EXPIRE_LIMIT = {
  FIFTEEN_MINUTES: '15m',
  ONE_DAY: '1d',
};

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const ONE_DAY = 24 * 60 * 60 * 1000;

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};

export const JWT_SECRET = 'JWT_SECRET';
export const APP_DOMAIN = 'APP_DOMAIN';

export const TEMPLATES_UPLOAD_DIR = path.join(process.cwd(), 'temps');
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export const CLOUDINARY_CLOUD_API_KEY = 'CLOUDINARY_CLOUD_API_KEY';
export const CLOUDINARY_CLOUD_API_SECRET = 'CLOUDINARY_CLOUD_API_SECRET';
export const CLOUDINARY_CLOUD_NAME = 'CLOUDINARY_CLOUD_NAME';

export const ENABLE_CLOUDINARY = 'ENABLE_CLOUDINARY';
