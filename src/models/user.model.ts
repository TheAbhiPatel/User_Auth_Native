import mongoose, { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isVerified: boolean;
  vCode: number;
  fCode: number;
  _id: mongoose.Schema.Types.ObjectId;
}

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    vCode: { type: Number, default: false },
    fCode: { type: Number, default: false },
  },
  { timestamps: true }
);

export default model<IUser>("userData", userSchema);
