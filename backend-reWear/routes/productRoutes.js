import express from 'express';
import { upload, createProduct, updateProduct, deleteProduct, getAllProducts, updateProductApprovalStatus } from '../controllers/productController.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();

router.post('/', protect, upload, createProduct);
router.put('/:id', upload, updateProduct);
router.delete('/:id', deleteProduct);
router.get("/allProduct", getAllProducts)
router.patch('/:id/approval', updateProductApprovalStatus);

export default router;