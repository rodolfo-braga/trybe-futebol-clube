import * as Joi from 'joi';
import ErrorMessage from '../enums/ErrorMessage';

const loginSchema = Joi.object({
  email: Joi.string().email().not().empty()
    .required()
    .messages({
      'any.required': ErrorMessage.EMPTY_FIELDS,
      'string.empty': ErrorMessage.EMPTY_FIELDS,
      'string.base': ErrorMessage.INVALID_INPUT,
      'string.email': ErrorMessage.INVALID_INPUT,
    }),
  password: Joi.string().min(6).not().empty()
    .required()
    .messages({
      'any.required': ErrorMessage.EMPTY_FIELDS,
      'string.empty': ErrorMessage.EMPTY_FIELDS,
      'string.min': ErrorMessage.INVALID_INPUT,
      'string.base': ErrorMessage.INVALID_INPUT,
    }),
});

export default loginSchema;
