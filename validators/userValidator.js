const Joi = require("joi");

exports.validateLogin = (data) =>
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }).validate(data);

exports.validateRegistration = (data) =>
  Joi.object({
    name: Joi.string().required(),
    regNo: Joi.string().required(),
    gender: Joi.string().valid("Male", "Female", "Other").required(),
    phoneNumber: Joi.string()
      .pattern(/^\d{10}$/)
      .required(),
    personalEmail: Joi.string().email().optional(),
    collegeEmail: Joi.string().email().required(),
    facultyAdviserName: Joi.string().required(),
    facultyAdviserEmail: Joi.string().email().required(),
    section: Joi.string().required(),
    branch: Joi.string().required(),
    password: Joi.string().min(6).required(),
  }).validate(data);
