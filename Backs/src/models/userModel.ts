import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { IUser, IUserMethods, UserModel } from '../interfaces/IUser'

// User Schema

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
  first_name: { type: String, required: true },
  email: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  password: { type: String, required: true },
  role: { type: Number, default: 2 },
  tokens: [{ token: { type: String, required: false } }],
  },
  {
    timestamps: true,
})

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }
  next()
})

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign(
    { _id: (user._id as string).toString()},
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  )
  user.tokens = [{ token }]
  await user.save()
  return token
}

userSchema.methods.toJSON = function () {
  const user = this as IUser
  const userObject = user.toObject()
  delete userObject.password
  delete userObject.tokens
  delete userObject.confirmPassword
  return userObject
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user
}

// User Model

const User = model<IUser, UserModel>('User', userSchema)

export default User
