import { Router } from "express";
import {
  deleteUser,
  forgotPassword,
  getAllUsers,
  getSingleUser,
  getUserDetails,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updatePassword,
  updateProfile,
  updateUserRole,
} from "../controllers/user.controller.js";
import authenticatedUser, { authRole } from "../middlewares/auth.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logoutUser);
router.route("/me").get(authenticatedUser, getUserDetails);
router.route("/password/update").put(authenticatedUser, updatePassword);
router.route("/me/update").put(authenticatedUser, updateProfile);
router
  .route("/admin/users")
  .get(authenticatedUser, authRole("admin"), getAllUsers);
router
  .route("/admin/:id")
  .get(authenticatedUser, authRole("admin"), getSingleUser);

router
  .route("/admin/:id")
  .put(authenticatedUser, authRole("admin"), updateUserRole);
router
  .route("/admin/:id")
  .delete(authenticatedUser, authRole("admin"), deleteUser);

export default router;
