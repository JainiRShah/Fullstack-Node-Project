const Joi = require("@hapi/joi");

function subscribeValidate(req) {
    const schema = Joi.object({
        subs_email: Joi.string().required().empty().email().messages({
        "string.base": `email should be a type of 'text'`,
        "string.empty": `email cannot be an empty field`,
        "string.email": `email format not valid`,
        "any.required": `email is a required field`,
      })
    })
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    return schema.validate(req, options);
  }

  module.exports = {
    subscribeValidate
  }