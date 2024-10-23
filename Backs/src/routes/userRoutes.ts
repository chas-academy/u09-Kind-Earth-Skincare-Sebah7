import express from "express";
import { IUser } from "../interfaces/IUser";
import {
  loginUser,
  registerUser,
  logoutUser,
  getUser,
  deleteOwnAccount,
  updateUser,
  saveRoutine,
  deleteSavedRoutine,
} from "../controllers/userController";
import {
  auth,
  admin,
  moderator,
  CustomRequest,
} from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const userData: Partial<IUser> = {
      first_name: req.body.first_name,
      email: req.body.email,
      dateOfBirth: req.body.dateOfBirth,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      role: req.body.role,
    };
    console.log(req.body);

    const registeredUser = await registerUser(userData);
    return res.status(201).json(registeredUser);
  } catch (error: any) {
    console.error("Error during registration:", error.message);
    return res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData: Partial<IUser> = {
      email: req.body.email,
      password: req.body.password,
    };
    const loggedInUser = await loginUser(userData);
    return res.status(200).json(loggedInUser);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

// Fetch logged in user
router.get("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const user = await getUser(id);
  res.status(200).json(user);
});

// Logout user
router.post("/logout", auth, async (req: CustomRequest, res) => {
  try {
    const result = await logoutUser(req);
    return res.status(200).json(result);
  } catch (error: any) {
    console.error("Error during logout:", error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Logout user from all devices
router.post("/logoutall", auth, async (req: CustomRequest, res) => {
  if (req.user) {
    req.user.tokens = [];
    await req.user.save();
  }
  return res.status(200).json({
    message: "User logged out from all devices successfully.",
  });
});

router.delete("/me", auth, deleteOwnAccount);

router.put("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    let userData = req.body;

    if (req.file) {
      userData.profileImageUrl = req.file.filename;
    }

    const updatedUser = await updateUser(id, userData);

    res.status(200).json({ message: "Update succeeded", updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/saveroutine", auth, saveRoutine);
router.delete("/delete-product/:productId", auth, deleteSavedRoutine);

export default router;
