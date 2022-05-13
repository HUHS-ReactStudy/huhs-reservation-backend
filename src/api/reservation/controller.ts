import { Context } from 'koa';
import Reservation, { IReservationDocument } from '../../model/Reservation';
import User, { IUser } from '../../model/User';
import addZero from '../../utils/add-zero';
import bodyValidator from '../../utils/body-validator';
import { IAddReservationRequestBody, IGetDailyReservationsQuery, IGetMonthlyReservationsQuery } from './interfaces';
import { addReservationBodySchema, getDailyReservationsQuerySchema, getMonthlyReservationsQuerySchema } from './joi-schema';

export const getMonthlyReservations = async (ctx: Context) => {
  const { error, value } = bodyValidator<IGetMonthlyReservationsQuery>(ctx.request.query, getMonthlyReservationsQuerySchema, {
    convert: true,
  });
  if (error) {
    ctx.status = 400;
    ctx.body = error;
    return;
  }
  const rawReservations = await Reservation.findByDate(value);
  const extractDate = (r: IReservationDocument) => `${r.year}-${addZero(r.month)}-${addZero(r.day)}`;
  const date = rawReservations.map(extractDate);
  ctx.status = 200;
  ctx.body = date;
  return;
};

export const getDailyReservations = async (ctx: Context) => {
  const { error, value } = bodyValidator<IGetDailyReservationsQuery>(ctx.request.query, getDailyReservationsQuerySchema, {
    convert: true,
  });
  if (error) {
    ctx.status = 400;
    ctx.body = error;
    return;
  }
  const rawReservations = await Reservation.find(value, null, { sort: { createdAt: 1, startTime: 1 } }).populate({
    path: 'userId',
  });
  const reservations = rawReservations.map(({ purpose, year, month, day, startTime, endTime, people, userId }) => ({
    purpose,
    year,
    month,
    day,
    startTime,
    endTime,
    people,
    user: {
      name: (userId as IUser).name,
      department: (userId as IUser).department,
    },
  }));
  ctx.status = 200;
  ctx.body = reservations;
  return;
};

// 예약되어 있는 시간대는 예약을 못하도록 막는 로직 추가할 것
export const addReservation = async (ctx: Context) => {
  const { error, value } = bodyValidator<IAddReservationRequestBody>(ctx.request.body, addReservationBodySchema);
  if (error) {
    ctx.status = 400;
    ctx.body = error;
    return;
  }
  const { name, studentId, department, ...reservationData } = value;
  try {
    let userId: any;
    const user = await User.findByStudentId(studentId);
    if (user) userId = user.id;
    else {
      const user = await User.create({ name, studentId, department });
      userId = user.id;
    }
    const reservation = await Reservation.create({ userId, ...reservationData });
    ctx.status = 201;
    ctx.body = reservation;
  } catch (error) {
    ctx.throw(500, 'Interval Server Error');
  }
};
