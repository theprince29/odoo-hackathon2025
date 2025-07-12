import express from 'express';
import {
  register,
  login,
  verifyEmail
  // logout,
  // getCurrentUser,
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import {
  validateRegister,
  validateLogin,
} from '../middleware/validation.js';

const router = express.Router();


router.post('/register', validateRegister, register);
router.post("/verifyEmail", verifyEmail)
router.post('/login', validateLogin, login);
// router.post('/logout', logout);

// router.get('/me', protect, getCurrentUser);

export default router;