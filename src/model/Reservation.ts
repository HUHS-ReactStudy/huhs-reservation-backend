import mongoose, { Document, Schema, Model, ObjectId } from 'mongoose';
import { IUser } from './User';

interface FindByDateParams {
  year?: number;
  month?: number;
  day?: number;
}

export interface IReservation {
  purpose: string;
  year: number;
  month: number;
  day: number;
  startTime: string;
  endTime: string;
  people: number;
  userId: ObjectId | IUser;
  createdAt: string;
  updatedAt: string;
}

// Method를 정의하는 부분
export interface IReservationDocument extends IReservation, Document {}

// Static Method를 정의하는 부분
export interface IReservationModel extends Model<IReservationDocument> {
  findByDate: (date: FindByDateParams) => Promise<IReservationDocument[]>;
}

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

// Static Method를 구현하는 부분
ReservationSchema.statics.findByDate = function (date: FindByDateParams) {
  return this.find(date);
};

const Reservation = mongoose.model<IReservationDocument, IReservationModel>('Reservation', ReservationSchema);

export default Reservation;
