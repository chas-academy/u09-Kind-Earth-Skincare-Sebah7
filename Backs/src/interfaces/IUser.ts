import { Document, HydratedDocument, Model } from 'mongoose';
export interface IUser extends Document {
  first_name: string
  email: string
  dateOfBirth: Date
  password: string
  confirmPassword?: string
  tokens: { token: string }[]
  role: number
}

export interface IUserMethods {
  generateAuthToken(): Promise<string>
  toJSON(): IUser
}

export interface UserModel extends Model<IUser, {}, IUserMethods> {
  findByCredentials(
    email: string, 
    password: string
  ): Promise<HydratedDocument<IUser, IUserMethods>>;
}