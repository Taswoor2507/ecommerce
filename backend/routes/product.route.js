import { Router } from "express";
import {
  createNewProduct,
  deleteProduct,
  getAllProducts,
  getProductDetail,
  updateProduct,
} from "../controllers/product.controller.js";
const router = Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(createNewProduct);
router.route("/product/:id").get(getProductDetail);
router.route("/product/:id").post(updateProduct);
router.route("/product/:id").delete(deleteProduct);
export default router;
