const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      maxDomainSegments: 3,
      tlds: { allow: ["com", "org", "net", "ca", "uk"] },
    })
    .required(),
  phone: Joi.string()
    .pattern(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/)
    .required(),
});

module.exports = { addSchema };
