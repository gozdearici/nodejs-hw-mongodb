import createHttpError from 'http-errors';
import { Contact } from '../db/model/contactModel.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/constants.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact.find();

  if (typeof filter.isFavourite === 'boolean') {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const contactsCount = await contactsQuery.clone().countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, page, perPage);

  return {
    data: {
      contacts,
      paginationData,
    },
  };
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
