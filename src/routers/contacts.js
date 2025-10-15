import { Router } from 'express';
import {
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

export const getBasicServerController = async (req, res) => {
  res.json({
    status: 200,
    message: 'Server is up and running 🚀',
  });
};

// Get all contacts router
contactsRouter.get('/', ctrlWrapper(getAllContactsController));

// Get contact by ID router
contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);

// Create new contact router
contactsRouter.post(
  '/',
  validationBody(createContactShema),
  ctrlWrapper(createContactController),
);

// Update any info of contact router
contactsRouter.patch(
  '/:contactId',
  isValidId,
  validationBody(updateContactShema),
  ctrlWrapper(patchContactController),
);

// Update or insert contact router
contactsRouter.put(
  '/:contactId',
  isValidId,
  validationBody(updateContactShema),
  ctrlWrapper(updateContactController),
);

// Delete contact by Id router
contactsRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default contactsRouter;
