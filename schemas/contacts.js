import Joi from "joi";

const addSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "missing required name field" }),
  email: Joi.string()
    .email({
      maxDomainSegments: 3,
      tlds: { allow: ["com", "org", "net", "ca", "uk"] },
    })
    .required(),
  phone: Joi.string()
    .pattern(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/)
    .required(),
  favorite: Joi.boolean(),
});

export default { addSchema };
