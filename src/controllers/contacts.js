import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  patchContact,
} from '../services/contact.js';
import createHttpError from 'http-errors';
import { paginationParams } from '../utils/paginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileCloudinary } from '../utils/saveFileCloudinary.js';
import { saveFileUploads } from '../utils/saveFileUploads.js';
import { env } from '../utils/env.js';
import { ENABLE_CLOUDINARY } from '../constants/constants.js';

// Get basic server controller
export const getBasicServerController = async (req, res) => {
  res.json({
    message: 'Server is running',
    status: 'success',
    code: 200,
  });
};

// Get all contacts controller
export const getAllContactsController = async (req, res) => {
  const { page, perPage } = paginationParams(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.status(200).json({
    message: 'Successfully found contacts!',
    status: 'success',
    code: 200,
    count: contacts.length,
    data: contacts,
  });
};

// Get contact by ID controller
export const getContactByIdController = async (req, res) => {
  const contactId = await getContactById(req.params.contactId);

  if (!contactId) {
    throw new createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    message: `Successfully found contact with id ${req.params.contactId}!`,
    status: 'success',
    code: 200,
    data: contactId,
  });
};

// Create new contact controller
export const createContactController = async (req, res) => {
  const photo = req.file;
  let photoURL = null;

  if (photo) {
    if (env(ENABLE_CLOUDINARY) === 'true') {
      photoURL = await saveFileCloudinary(photo);
    } else {
      photoURL = await saveFileUploads(photo);
    }
  }

  const contact = await createContact({ ...req.body, photoURL: photoURL });
  res.status(201).json({
    message: 'Successfully created a contact!',
    status: 'success',
    code: 201,
    data: contact,
  });
};

// Update any info of contact controller
export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const photo = req.file;
  let photoURL = null;

  if (photo) {
    if (env(ENABLE_CLOUDINARY) === 'true') {
      photoURL = await saveFileCloudinary(photo);
    } else {
      photoURL = await saveFileUploads(photo);
    }
    req.body.photoURL = photoURL;
  }

  const contact = await patchContact(contactId, req.body);

  if (!contact) {
    throw new createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    message: 'Successfully patched a contact!',
    status: 'success',
    code: 201,
    data: contact,
  });
};

// Update or insert contact controller
export const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body, {
    upsert: true,
  });

  if (!contact) {
    throw new createHttpError(404, 'Student not found');
  }

  const status = contact.isNew ? 201 : 200;

  res.status(status).json({
    message: `Successfully upserted a student!`,
    status: 'success',
    code: status,
    data: contact,
  });
};

// Delete contact by Id controller
export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);

  if (!contact) {
    throw new createHttpError(404, 'Student not found');
  }

  res.status(204).send();
};
