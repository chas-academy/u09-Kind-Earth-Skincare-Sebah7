import express from 'express';
import { IUser } from '../interfaces/IUser';
import { loginUser, registerUser } from '../controllers/userController';
import { auth, admin, moderator, CustomRequest } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const userData: Partial<IUser> = {
      first_name: req.body.name,
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
        console.error('Error during registration:', error.message);
    return res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
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
router.get('/me', auth, async (req: CustomRequest, res) => {
  return res.status(200).json({
    user: req.user,
  });
});

// Logout user
router.post('/logout', auth, async (req: CustomRequest, res) => {
  if (req.user) {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
  }

  return res.status(200).json({
    message: 'User logged out successfully.',
  });
});

// Logout user from all devices
router.post('/logoutall', auth, async (req: CustomRequest, res) => {
  if (req.user) {
    req.user.tokens = [];
    await req.user.save();
  }
  return res.status(200).json({
    message: 'User logged out from all devices successfully.',
  });
});

export default router;