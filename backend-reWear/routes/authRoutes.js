import express from 'express';
import {
  register,
  login,
  logout,
  getCurrentUser,
} from '../controllers/authController.js';
import { protect, authorize } from '../middleware/auth.js';
import {
  validateRegister,
  validateLogin,
} from '../middleware/validation.js';

const router = express.Router();


router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/logout', logout);

router.get('/me', protect, getCurrentUser);

export default router;