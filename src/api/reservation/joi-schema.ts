import Joi from 'joi';

export const getMonthlyReservationsQuerySchema = Joi.object({
  year: Joi.number().required(),
  month: Joi.number().required(),
});

export const getDailyReservationsQuerySchema = Joi.object({
  year: Joi.number().required(),
  month: Joi.number().required(),
  day: Joi.number().required(),
});

export const addReservationBodySchema = Joi.object({
  name: Joi.string().required(),
  studentId: Joi.string().required(),
  department: Joi.string().required(),
  purpose: Joi.string().required(),
  year: Joi.number().min(2022).max(2050).required(),
  month: Joi.number().min(1).max(12).required(),
  day: Joi.number().min(1).max(31).required(),
  startTime: Joi.string().required(),
  endTime: Joi.string().required(),
  description: Joi.string(),
});

export const checkReservationOwnerBodySchema = Joi.object({
  reservationId: Joi.string().hex().length(24).required(),
  studentId: Joi.string().required(),
});

export const patchOrDeleteReservationParamSchema = Joi.object({
  reservationId: Joi.string().hex().length(24).required(),
});

export const patchReservationBodySchema = Joi.object({
  purpose: Joi.string().required(),
  year: Joi.number().min(2022).max(2050).required(),
  month: Joi.number().min(1).max(12).required(),
  day: Joi.number().min(1).max(31).required(),
  startTime: Joi.string().required(),
  endTime: Joi.string().required(),
  description: Joi.string().required(),
});
