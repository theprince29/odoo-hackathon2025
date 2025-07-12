import { adminLogin } from "../controllers/adminContoller.js";
import { getAllProducts, updateProductApprovalStatus } from "../controllers/productController.js";
import express from 'express'

const router = express.Router()

router.post("/login", adminLogin)
router.get("/allProduct", getAllProducts)
router.patch('/:id/approval', updateProductApprovalStatus);

export default router;
