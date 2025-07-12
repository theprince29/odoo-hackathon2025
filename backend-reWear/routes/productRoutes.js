import express from 'express';
import { upload, createProduct, updateProduct, deleteProduct, buyProduct } from '../controllers/productController.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();

router.post('/', protect, upload, createProduct);
router.put('/:id', upload, updateProduct);
router.delete('/:id', deleteProduct);

router.post('/buyProduct', protect, buyProduct )

export default router;