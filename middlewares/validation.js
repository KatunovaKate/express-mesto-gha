const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

module.exports.authValidation = celebrate({
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
    password: Joi.string().required().min(6)
      .messages({
        'any.required': 'Пароль обязателен',
        'string.min': 'Пароль должен содержать не менее 6 символов',
      }),
  }),
});
