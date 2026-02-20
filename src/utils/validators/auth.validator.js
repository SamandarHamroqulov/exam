const Joi = require("joi");

const registerValidator = Joi.object({
  firstname: Joi.string().required().trim().min(3).messages({
    "string.base": "Firstname must be a string",
    "string.empty": "Firstname must not be empty",
    "any.required": "Firstname is required",
  }),
  lastname: Joi.string().required().trim().min(3).messages({
    "string.base": "Lastname must be a string",
    "string.empty": "Lastname must not be empty",
    "any.required": "Lastname is required",
  }),
  email: Joi.string().required().trim().email().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email must not be empty",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().trim().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password must not be empty",
    "any.required": "Password is required",
  }),
});
const loginValidator = Joi.object({
  email: Joi.string().required().trim().email().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email must not be empty",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().trim().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password must not be empty",
    "any.required": "Password is required",
  }),
});
const verifyValidator = Joi.object({
  email: Joi.string().trim().required().email().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email must not be empty",
    "any.required": "Email is requierd",
  }),
  otp: Joi.string().required().trim().messages({
    "string.base": "OTP must be a string",
    "string.empty": "OTP must not be empty",
    "any.required": "OTP is requierd",
  }),
});
const forgotPassOrResendOtpVal = Joi.object({
  email: Joi.string().trim().required().email().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email must not be empty",
    "any.required": "Email is requierd",
  }),
});
const resetPassValidator = Joi.object({
  email: Joi.string().trim().required().email().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email must not be empty",
    "any.required": "Email is requierd",
  }),
  otp: Joi.string().required().trim().messages({
    "string.base": "OTP must be a string",
    "string.empty": "OTP must not be empty",
    "any.required": "OTP is requierd",
  }),
  new_password: Joi.string().required().trim().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password must not be empty",
    "any.required": "Password is required",
  }),
});
const changePasswordValidator = Joi.object({
  newPassword: Joi.string().required().trim().messages({
    "string.base": "New password must be a string",
    "string.empty": "New password must not be empty",
    "any.required": "New password is required",
  }),
  oldPassword: Joi.string().required().trim().messages({
    "string.base": "New password must be a string",
    "string.empty": "New password must not be empty",
    "any.required": "New password is required",
  }),
});

module.exports = {
  registerValidator,
  loginValidator,
  verifyValidator,
  forgotPassOrResendOtpVal,
  resetPassValidator,
  changePasswordValidator
};
