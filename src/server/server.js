import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from '../utils/env.js';
import { getAllContacts, getContactById } from '../services/contact.js';

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

  // Get all contacts
  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();

    res.status(200).json({
      message: 'Successfully found contacts!',
      status: 'success',
      code: 200,
      count: contacts.length,
      data: contacts,
    });
  });

  // Get contact by ID
  app.get('/contacts/:contactId', async (req, res, next) => {
    try {
      const contactId = await getContactById(req.params.contactId);

      if (!contactId) {
        res.status(404).json({
          message: 'Contact not found',
          status: 'error',
          code: 404,
        });
      } else {
        res.status(200).json({
          message: `Successfully found contact with id ${req.params.contactId}!`,
          status: 'success',
          code: 200,
          data: contactId,
        });
      }
    } catch (err) {
      next(err);
    }
  });

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found',
      status: 'error',
      code: 404,
    });
  });

  // 500 err handler
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Not found',
      status: 'error',
      code: 500,
    });
  });

  // Listening the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
