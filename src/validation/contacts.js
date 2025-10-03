import Joi from 'joi';

export const createContactShema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least 3 characters',
    'string.max': 'Name should have at most 20 characters',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Phone Number should be a string',
    'string.min': 'Phone Number should have at least 3 characters',
    'string.max': 'Phone Number should have at most 20 characters',
    'any.required': 'Phone Number is required',
  }),
  email: Joi.string().email().min(3).max(20).required().messages({
    'string.base': 'Email should be a string',
    'string.min': 'Email should have at least 3 characters',
    'string.max': 'Email should have at most 20 characters',
    'any.required': 'Email is required',
  }),
  isFavourite: Joi.boolean().required(),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid('work', 'personal', 'home')
    .required()
    .messages({
      'string.base': 'contactType should be a string',
      'string.min': 'contactType should have at least 3 characters',
      'string.max': 'contactType should have at most 20 characters',
      'any.required': 'contactType is required',
    }),
});

export const updateContactShema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least 3 characters',
    'string.max': 'Name should have at most 20 characters',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string().min(3).max(20).messages({
    'string.base': 'Phone Number should be a string',
    'string.min': 'Phone Number should have at least 3 characters',
    'string.max': 'Phone Number should have at most 20 characters',
    'any.required': 'Phone Number is required',
  }),
  email: Joi.string().email().min(3).max(20).messages({
    'string.base': 'Email should be a string',
    'string.min': 'Email should have at least 3 characters',
    'string.max': 'Email should have at most 20 characters',
    'any.required': 'Email is required',
  }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid('work', 'personal', 'home')
    .messages({
      'string.base': 'Email should be a string',
      'string.min': 'Email should have at least 3 characters',
      'string.max': 'Email should have at most 20 characters',
      'any.required': 'Email is required',
    }),
});
