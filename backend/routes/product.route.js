import { Router } from "express";
import authenticatedUser, { authRole } from "../middlewares/auth.js";

import {
  createNewProduct,
  deleteProduct,
  getAllProducts,
  getProductDetail,
  updateProduct,
  productReview,
  getReviews,
  deleteReview,
} from "../controllers/product.controller.js";
const router = Router();

router.route("/products").get(getAllProducts);
router
  .route("/product/new")
  .post(authenticatedUser, authRole("admin"), createNewProduct);
router.route("/product/:id").get(getProductDetail);
router
  .route("/product/:id")
  .put(authenticatedUser, authRole("admin"), updateProduct);
router
  .route("/product/:id")
  .delete(authenticatedUser, authRole("admin"), deleteProduct);
router.route("/review").put(authenticatedUser, productReview);

router.route("/reviews").get(getReviews);

router.route("/reviews").delete(authenticatedUser, deleteReview);
export default router;
