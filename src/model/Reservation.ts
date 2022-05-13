import mongoose, { Document, Schema, Model } from 'mongoose';
import { IUserModel } from './User';

export interface IReservation {
  purpose: string;
  year: number;
  month: number;
  day: number;
  startTime: string;
  endTime: string;
  people: number;
  userId: string | IUserModel;
}

// Method를 정의하는 부분
interface IReservationDocument extends IReservation, Document {}

// Static Method를 정의하는 부분
export interface IReservationModel extends Model<IReservationDocument> {}

// Schema를 생성하는 부분
const ReservationSchema: Schema<IReservationDocument> = new Schema(
  {
    purpose: { type: String, required: true },
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    day: { type: Number, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    people: { type: Number, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: { createdAt: true } },
);

const Reservation = mongoose.model<IReservationDocument, IReservationModel>('Reservation', ReservationSchema);

export default Reservation;
