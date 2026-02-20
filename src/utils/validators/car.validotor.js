const Joi = require("joi");

const categroyValidator = Joi.object({
  name: Joi.string().required().trim().min(3).messages({
    "string.base": "Category Name must be a string",
    "string.empty": "Category Name must not be empty",
    "any.required": "Category Name is required",
  }),
  category_image: Joi.string().trim().min(10).messages({
    "string.base": "Category description must be a string",
    "string.empty": "Category description must not be empty",
  }),
});
const carValidator = Joi.object({
  car_name: Joi.string().required().trim().min(2).max(80).messages({
    "string.base": "Car name must be a string",
    "string.empty": "Car name must not be empty",
    "any.required": "Car name is required",
  }),

  color: Joi.string().required().trim().min(2).max(40).messages({
    "string.base": "Color must be a string",
    "string.empty": "Color must not be empty",
    "any.required": "Color is required",
  }),

  production_year: Joi.number().integer().min(1900).max(2100).required().messages({
    "number.base": "Production year must be a number",
    "number.integer": "Production year must be an integer",
    "any.required": "Production year is required",
  }),

  price: Joi.number().min(0).required().messages({
    "number.base": "Price must be a number",
    "any.required": "Price is required",
  }),

  description: Joi.string().trim().max(500).allow("").messages({
    "string.base": "Description must be a string",
  }),

  distance: Joi.number().min(0).optional().messages({
    "number.base": "Distance must be a number",
  }),

  gearbox: Joi.string().trim().optional().messages({
    "string.base": "Gearbox must be a string",
  }),

  engine: Joi.string().trim().optional().messages({
    "string.base": "Engine must be a string",
  }),

  car_image: Joi.string().trim().min(5).optional().messages({
    "string.base": "Car image must be a string",
    "string.empty": "Car image must not be empty",
  }),
  categoryId: Joi.string().required().trim()
});

module.exports = { categroyValidator, carValidator };
