import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './env.js';

const PORT = env('PORT', '3000');

export const setupServer = () => {
  const app = express();

  app.use(pino({ transport: { target: 'pino-pretty' } }));
  app.use(cors());
  app.use(express.json());

  // Basic route
  app.get('/', (req, res) => {
    res.json({
      message: 'Server is running',
      status: 'success',
      code: 200,
    });
  });

  // 404 handler
  app.use((req, res, next) => {
    res.status(404).json({
      message: 'Not found',
      status: 'error',
      code: 404,
    });
  });

  // Listening the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
