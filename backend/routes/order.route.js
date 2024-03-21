import { Router } from "express";
import authenticatedUser, { authRole } from "../middlewares/auth.js";
import {
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  myOrders,
  newOrder,
  updateOrder,
} from "../controllers/order.controller.js";
const router = Router();
router.route("/orders/all").get(authenticatedUser, getAllOrders);
router.route("/order/new").post(authenticatedUser, newOrder);
router.route("/orders/me").get(authenticatedUser, myOrders);
router.route("/order/:id").get(authenticatedUser, getSingleOrder);

router
  .route("/admin/order/:id")
  .put(authenticatedUser, authRole("admin"), updateOrder);
router
  .route("/admin/order/:id")
  .delete(authenticatedUser, authRole("admin"), deleteOrder);

export default router;
