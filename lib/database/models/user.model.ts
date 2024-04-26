import { Schema, model, models } from "mongoose";

export interface IUser extends Document {
  _id: string;
  userId: string;
  clerkId: string;
  email: string;
  username: Date;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  photo: boolean;
  profileCompleted: boolean;
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  PhoneNumber: { type: String },
  address: { type: String },
  profileCompleted: { type: Boolean, default: false },
  photo: { type: String, required: true },
});

const User = models.User || model("User", UserSchema);

export default User;
