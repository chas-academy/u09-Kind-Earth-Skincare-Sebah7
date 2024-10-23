import { Document, HydratedDocument, Model, Types } from "mongoose";
export interface IUser extends Document {
  first_name: string;
  email: string;
  dateOfBirth: Date;
  password: string;
  confirmPassword?: string;
  currentPassword?: string;
  tokens: { token: string }[];
  role: number;
  savedProducts: string[];
  routines: Types.ObjectId[];
}

export interface IUserMethods {
  generateAuthToken(): Promise<string>;
  toJSON(): IUser;
}

export interface UserModel extends Model<IUser, {}, IUserMethods> {
  findByCredentials(
    email: string,
    password: string
  ): Promise<HydratedDocument<IUser, IUserMethods>>;
}
