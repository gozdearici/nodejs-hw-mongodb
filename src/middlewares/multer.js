import multer from 'multer';
import { TEMPLATES_UPLOAD_DIR } from '../constants/constants.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, TEMPLATES_UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

export const upload = multer({ storage });
