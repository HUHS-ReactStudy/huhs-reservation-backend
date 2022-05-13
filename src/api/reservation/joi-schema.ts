import Joi from 'joi';

export const addReservationSchema = Joi.object({
  name: Joi.string().required(),
  studentId: Joi.string().required(),
  department: Joi.string().required(),
  purpose: Joi.string().required(),
  year: Joi.number().min(2022).max(2050).required(),
  month: Joi.number().min(1).max(12).required(),
  day: Joi.number().min(1).max(31).required(),
  startTime: Joi.string().required(),
  endTime: Joi.string().required(),
  people: Joi.number().min(1).max(10).required(),
});
