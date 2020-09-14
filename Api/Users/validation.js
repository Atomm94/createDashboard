const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

const userRegister = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required()
})

const userLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required()
})

const registerValidation = validator.body(userRegister);
const loginValidation = validator.body(userLogin);

module.exports = {
    registerValidation,
    loginValidation
}