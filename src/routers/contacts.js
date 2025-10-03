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
import { validationBody } from '../middlewares/validateBody.js';
import {
  createContactShema,
  updateContactShema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';

const contactsRouter = Router();

// Get basic server router
contactsRouter.get('/', ctrlWrapper(getBasicServerController));

// Get all contacts router
contactsRouter.get('/contacts', ctrlWrapper(getAllContactsController));

// Get contact by ID router
contactsRouter.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);

// Create new contact router
contactsRouter.post(
  '/contacts',
  validationBody(createContactShema),
  ctrlWrapper(createContactController),
);

// Update any info of contact router
contactsRouter.patch(
  '/contacts/:contactId',
  isValidId,
  validationBody(updateContactShema),
  ctrlWrapper(patchContactController),
);

// Update or insert contact router
contactsRouter.put(
  '/contacts/:contactId',
  isValidId,
  validationBody(updateContactShema),
  ctrlWrapper(updateContactController),
);

// Delete contact by Id router
contactsRouter.delete(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default contactsRouter;
