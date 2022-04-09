const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const authValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).custom((value, helper) => {
      if (!validator.isEmail(value)) {
        return helper.error('string.email');
      }
      return value;
    })
      .messages({
        'any.required': 'Е-майл обязателен',
      }),
    password: Joi.string().required()
      .messages({
        'any.required': 'Пароль обязателен',
      }),
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Имя не должно быть меньше 2ух символов',
        'string.max': 'Имя не должно быть больше 30ти символов',
      }),
    about: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Описание не должно быть меньше 2ух символов',
        'string.max': 'Описание не должно быть больше 30ти символов',
      }),
    avatar: Joi.string().custom((value, helper) => {
      if (!validator.isURL(value)) {
        return helper.error('string.uri');
      }
      return value;
    }),
  }),
});

const userValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Имя не должно быть меньше 2ух символов',
        'string.max': 'Имя не должно быть больше 30ти символов',
      }),
    about: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Описание не должно быть меньше 2ух символов',
        'string.max': 'Описание не должно быть больше 30ти символов',
      }),
    avatar: Joi.string().custom((value, helper) => {
      if (!validator.isURL(value)) {
        return helper.error('string.uri');
      }
      return value;
    }),
  }),
});

const cardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Название обязательно',
        'string.min': 'Название не должно быть меньше 2ух символов',
        'string.max': 'Название не должно быть больше 30ти символов',
      }),
    link: Joi.string().required().custom((value, helper) => {
      if (!validator.isURL(value)) {
        return helper.error('string.uri');
      }
      return value;
    }),
  }),
});

module.exports = {
  authValidation,
  userValidation,
  cardValidation,
};
