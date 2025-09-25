import createHttpError from 'http-errors';
import { Contact } from '../db/model/contactModel.js';

export const getAllContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  // Control duplicate contact
  const existing = await Contact.findOne({
    $or: [{ phoneNumber: payload.phoneNumber }, { email: payload.email }],
  });

  if (existing) {
    throw createHttpError(409, 'Contact already exists');
  }

  const newContact = await Contact.create(payload);
  return newContact;
};

export const patchContact = async (contactId, payload) => {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, payload, {
    new: true,
    runValidators: true,
  });
  return updatedContact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId },
    payload,
    { new: true, runValidators: true, upsert: options.upsert || false },
  );

  return updatedContact;
};

export const deleteContact = async (contactId) => {
  const contact = await Contact.findByIdAndDelete({
    _id: contactId,
  });
  return contact;
};
