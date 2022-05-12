import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IUser {
  name: string;
  studentId: string;
  department: string;
}

// Method를 정의하는 부분
interface IUserDocument extends IUser, Document {}

// Static Method를 정의하는 부분
export interface IUserModel extends Model<IUserDocument> {}

// Schema를 생성하는 부분
const UserSchema: Schema<IUserDocument> = new Schema({
  name: { type: String, required: true },
  studentId: { type: String, required: true, unique: true },
  department: { type: String, required: true },
});

// Method를 구현하는 부분
// UserSchema.methods.setPassword = async function (password: string) {
//   const hash = await bcrypt.hash(password, 10);
//   this.hashedPassword = hash;
// };

// UserSchema.methods.checkPassword = async function (password: string) {
//   const result = await bcrypt.compare(password, this.hashedPassword);
//   return result;
// };

// Static Method를 구현하는 부분
// UserSchema.statics.findByUsername = function (username: string) {
//   return this.findOne({ username });
// };

const User = mongoose.model<IUserDocument, IUserModel>('User', UserSchema);

export default User;
