// src/models/User.ts
import mongoose, { Schema, Document, models, Model } from 'mongoose';

export interface IUser extends Document {
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  emailVerified?: Date;
  image?: string;
  password?: string;
  otp?: string;
  otpExpires?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, unique: true, required: true },
  emailVerified: { type: Date },
  image: { type: String },
  password: { type: String },
  otp: { type: String },
  otpExpires: { type: Date },
});

const User: Model<IUser> = models.User || mongoose.model<IUser>('User', UserSchema);

export default User;