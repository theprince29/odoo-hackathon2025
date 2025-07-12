import express from 'express'
import { getUserProductUpload, getPurchasedProducts } from '../controllers/userProfileController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/productUpload', protect, getUserProductUpload);
router.get('/productPurchases', protect, getPurchasedProducts);

export default router;
