import { IReservation, IUser } from '../../model';

export interface IGetMonthlyReservationsQuery {
  year: number;
  month: number;
}

export interface IGetDailyReservationsQuery extends IGetMonthlyReservationsQuery {
  day: number;
}

export interface IAddReservationRequestBody extends IUser, Omit<IReservation, 'userId' | 'createdAt' | 'updatedAt'> {}
