import { IReservation, IUser } from '../../model';

export interface IGetMonthlyReservationsQuery {
  year: number;
  month: number;
}

export interface IGetDailyReservationsQuery extends IGetMonthlyReservationsQuery {
  day: number;
}

export interface IAddReservationRequestBody extends IUser, Omit<IReservation, 'userId' | 'createdAt' | 'updatedAt'> {}

export interface ICheckReservationOwnerRequestBody {
  reservationId: string;
  studentId: string;
}

export interface IPatchOrDeleteReservationParam {
  reservationId: string;
}

export interface IPatchReservationRequestBody
  extends Pick<IReservation, 'purpose' | 'year' | 'month' | 'day' | 'startTime' | 'endTime' | 'description'> {}
