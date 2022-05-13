import { Context } from 'koa';
import { IReservation, IUser } from '../../model';
import Reservation from '../../model/Reservation';
import User from '../../model/User';
import bodyValidator from '../../utils/body-validator';
import { addReservationSchema } from './joi-schema';

interface IAddReservationRequestBody extends IUser, Omit<IReservation, 'userId'> {}

export const addReservation = async (ctx: Context) => {
  const errorMessage = bodyValidator(ctx.request.body, addReservationSchema);
  if (errorMessage) {
    ctx.status = 400;
    ctx.body = errorMessage;
    return;
  }
  const { name, studentId, department, ...reservationData } = <IAddReservationRequestBody>ctx.request.body;
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
