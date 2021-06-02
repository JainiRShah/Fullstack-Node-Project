const JoiBase = require("@hapi/joi");
const JoiDate = require("@hapi/joi-date");

const Joi = JoiBase.extend(JoiDate); // extend Joi with Joi Date

function portfolioValidate(req) {
    const schema = Joi.object({
        proj_category: Joi.string().required().empty().messages({
        "string.base": `Project Category should be a type of 'text'`,
        "string.empty": `Project Category  cannot be an empty field`,
        "any.required": `Project Category  is a required field`,
      }),
      proj_name: Joi.string().required().empty().messages({
        "string.base": `Project Name should be a type of 'text'`,
        "string.empty": `Project Name cannot be an empty field`,
        "any.required": `Project Name is a required field`,
      }),
      proj_title: Joi.string().required().empty().messages({
        "string.base": `Project Title should be a type of 'text'`,
        "string.empty": `Project Title cannot be an empty field`,
        "any.required": `Project Title is a required field`,
      }),
      proj_website: Joi.string().required().empty().messages({
        "string.base": `Project Website should be a type of 'text'`,
        "string.empty": `Project Website cannot be an empty field`,
        "any.required": `Project Website is a required field`,
      }),
      proj_date: Joi.date().required().messages({
        "any.required": `date is a required field`,
      }),
      proj_desc: Joi.string().required().empty().messages({
        "string.base": `Project Description should be a type of 'text'`,
        "string.empty": `Project Description cannot be an empty field`,
        "any.required": `Project Description is a required field`,
      }),
    })
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    return schema.validate(req, options);
  }

  module.exports = {
    portfolioValidate
  }