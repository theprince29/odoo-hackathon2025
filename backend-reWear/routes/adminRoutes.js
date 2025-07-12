import { adminLogin } from "../controllers/adminContoller.js";
import { getAllProducts, updateProductApprovalStatus } from "../controllers/productController.js";
import express from 'express'
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router()

router.post("/login", adminLogin)
router.get("/allProduct", getAllProducts)
router.patch('/:id/approval', verifyAdmin, updateProductApprovalStatus);

export default router;
