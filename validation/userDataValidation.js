import joi from "@hapi/joi";

// Validation
const userDataValidation = (data) => {
  const bodyDataSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().min(6).required().email(),
    password: joi.string().min(18).required(),
  });

  return bodyDataSchema.validate(data);
};

export default userDataValidation;
