import { Router } from 'express';
import {
  getBasicServerController,
  getAllContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

// Get basic server router
contactsRouter.get('/', ctrlWrapper(getBasicServerController));

// Get all contacts router
contactsRouter.get('/contacts', ctrlWrapper(getAllContactsController));

// Get contact by ID router
contactsRouter.get(
  '/contacts/:contactId',
  ctrlWrapper(getContactByIdController),
);

// Create new contact router
contactsRouter.post('/contacts', ctrlWrapper(createContactController));

// Update any info of contact router
contactsRouter.patch(
  '/contacts/:contactId',
  ctrlWrapper(patchContactController),
);

// Update or insert contact router
contactsRouter.put(
  '/contacts/:contactId',
  ctrlWrapper(updateContactController),
);

// Delete contact by Id router
contactsRouter.delete(
  '/contacts/:contactId',
  ctrlWrapper(deleteContactController),
);

export default contactsRouter;
