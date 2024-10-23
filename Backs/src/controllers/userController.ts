import User from "../models/userModel";
import { IUser } from "../interfaces/IUser";
import { CustomRequest } from "../middlewares/authMiddleware";
import { Request, Response } from "express";
import Product from "../models/productModel";
import RoutineMatcherModel from "../models/routineModel";
import { Types } from "mongoose";

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
    console.log("User before logout:", req.user);
    console.log("Token before logout:", req.token);

    req.user.tokens = req.user.tokens.filter((token: any) => {
      return token.token !== req.token;
    });

    await req.user.save();

    console.log("User after logout:", req.user);

    return { message: "User logged out successfully." };
  } catch (error) {
    console.error("Logout Error:", error);

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

export const getAllUsers = async () => {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    console.error("Error retrieving users:", error);
    throw error;
  }
};

export const updateUserRole = async (req: CustomRequest, res: Response) => {
  try {
    const { role } = req.body;
    const { userId } = req.params;
    const validRoles = [0, 1, 2];

    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.role = role;
    await user.save();

    console.log("User role updated:", user);
    res.status(200).json({ message: "User role updated successfully", user });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
    return await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  } catch (error) {
    return { error: error };
  }
};

export const saveRoutine = async (req: CustomRequest, res: Response) => {
  try {
    const { productIds, routineName } = req.body;

    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Authentication failed. User not found." });
    }
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validProductIds = await Product.find({
      _id: { $in: productIds },
    }).select("_id name");

    if (validProductIds.length === 0) {
      return res.status(404).json({ message: "No valid products found" });
    }

    const recommendedProducts = validProductIds.map((product) => ({
      productId: product._id,
      productName: product.name, // Ensure the name is passed here
      reason: "Custom routine", // Example reason, you can change this
    }));

    const routine = await RoutineMatcherModel.create({
      userId: user._id,
      questions: [], // Add relevant questions if necessary
      userAnswers: [], // Add relevant answers if necessary
      result: {
        userId: user._id,
        recommendedProducts,
      },
      name: routineName || "My Custom Routine",
    });

    // validProductIds.forEach((productId) => {
    //   if (!user.routines.includes(productId._id)) {
    //     user.routines.push(productId._id);
    //   }
    // });

    user.routines.push(routine._id as any);
    await user.save();

    res.status(200).json({
      message: "Routine saved successfully",
      routine,
      userRoutines: user.routines,
    });
  } catch (error) {
    console.error("Error saving routine:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteSavedRoutine = async (
  id: string,
  req: CustomRequest,
  res: Response
) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.routines = user.routines.filter((id) => id.toString() !== productId);
    await user.save();
    res.status(200).json({ message: "Product deleted successfully", user });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
