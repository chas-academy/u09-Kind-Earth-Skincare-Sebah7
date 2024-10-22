import User from "../models/userModel";
import { IUser } from "../interfaces/IUser";
import bcrypt from "bcrypt";
import { CustomRequest } from "../middlewares/authMiddleware";
import { Response } from "express";

export const registerUser = async (user: Partial<IUser>) => {
  console.log("Incoming user registration:", user);

  const { first_name, email, password, confirmPassword, dateOfBirth } = user;

  console.log({
    first_name,
    email,
    password,
    confirmPassword,
    dateOfBirth,
  });

  if (!first_name || !email || !password || !confirmPassword || !dateOfBirth) {
    return {
      error: "Please provide all the required fields",
    };
  }
  if (password !== confirmPassword) {
    return {
      error: "Password and confirm password do not match",
    };
  }
  if (password.length < 8 || password.length > 10) {
    return {
      error: "Password should be between 8 and 10 characters",
    };
  }

  const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
  if (age < 18) {
    return {
      error: "User must be at least 18 years old",
    };
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    return {
      error: "User with that email already exists.",
    };
  }

  const existingUserName = await User.findOne({
    firstName: first_name.toLowerCase(),
  });
  if (existingUserName) {
    return {
      error: "User with that username already exists.",
    };
  }

  const newUser = new User({
    first_name,
    email: email.toLowerCase(),
    password,
    dateOfBirth,
    role: user.role,
  });
  await newUser.save();
  const token = await newUser.generateAuthToken();
  return {
    user: newUser,
    token,
  };
};

export const loginUser = async (user: Partial<IUser>) => {
  const { email, password } = user;
  if (!email || !password) {
    return {
      error: "Please provide all the required fields",
    };
  }
  const existingUser = await User.findByCredentials(email, password);
  if (!existingUser) {
    return null;
  }
  const token = await existingUser.generateAuthToken();
  return {
    user: existingUser,
    token,
  };
};

export const logoutUser = async (req: any) => {
  try {
    console.log("User before logout:", req.user); // Debugging: Log the user before logout
    console.log("Token before logout:", req.token);

    req.user.tokens = req.user.tokens.filter((token: any) => {
      return token.token !== req.token;
    });

    await req.user.save();

    console.log("User after logout:", req.user); // Debugging: Log the user after logout

    return { message: "User logged out successfully." };
  } catch (error) {
    console.error("Logout Error:", error); // Detailed error logging

    return { error: error };
  }
};

export const getUser = async (id: string) => {
  try {
    return await User.findById(id);
  } catch (error) {
    return { error: error };
  }
};

export const deleteOwnAccount = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Authentication failed. User not found." });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.findByIdAndDelete(req.user._id);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user's account:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUser = async (id: string, data: Partial<IUser>) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return { error: "User not found" };
    }

    if (data.password) {
      if (!data.currentPassword) {
        return { error: "Current password is required" };
      }

      const isMatch = await bcrypt.compare(data.currentPassword, user.password);
      if (!isMatch) {
        return { error: "Current password is incorrect" };
      }

      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    return updatedUser;
  } catch (error) {
    return { error: error };
  }
};
