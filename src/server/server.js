import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from '../utils/env.js';
import contactsRouter from '../routers/contacts.js';
import { errorHandler } from '../middlewares/errorHandler.js';
import { notFoundHandler } from '../middlewares/notFoundHandler.js';

const PORT = env('PORT', '3000');

export const setupServer = () => {
  const app = express();

  app.use(pino({ transport: { target: 'pino-pretty' } }));
  app.use(cors());
  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );

  // Contacts routes
  app.use(contactsRouter);

  // 404 Not Found Error handler
  app.use(notFoundHandler);

  // 500 Internal Server Error handler
  app.use(errorHandler);

  // Listening the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
