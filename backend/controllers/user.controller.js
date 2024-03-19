import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import ErrorHandler from "../utils/errorHandler.js";
import getJWTandSetToCookies from "../utils/getJWT&SetToCookies.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: { public_id: "avatar1000333", url: "avatar.com/taswoor" },
  });

  getJWTandSetToCookies(user, 201, res);
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Email and password are required", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Incorrect password or email", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password ", 401));
  }

  getJWTandSetToCookies(user, 200, res);
});

const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });

  res.status(200).json({
    success: true,
    message: "user logout successfully",
  });
});

const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const resetToken = await user.resetPassToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your Password reset token is \n\n ${resetPasswordUrl}\n\n If you did not request this, please ignore this email.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

const resetPassword = asyncHandler(async (req, res, next) => {
  const resetPasswordToken = await crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Password reset token is invalid or expired", 403)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  getJWTandSetToCookies(user, 200, res);
});

// get user details

const getUserDetails = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// update password

const updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is invalid", 401));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not matched", 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  getJWTandSetToCookies(user, 200, res);
});

// update profile

const updateProfile = asyncHandler(async (req, res, next) => {
  const newUserData = {
    email: req.body.email,
    name: req.body.name,
  };

  // will add clodinary later

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });

  res.status(200).json({
    success: true,
    message: "User update successfully...",
  });
});

// get all users -- admin

const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// get single user -- admin

const getSingleUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User with this id ${req.params.id} not found`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// update user role
const updateUserRole = asyncHandler(async (req, res, next) => {
  const { email, name, role } = req.body;
  console.log("Role received:", role); // Log the role value

  // Check if the user exists
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Update the user's role
  user.role = role;

  // Save the updated user
  await user.save();

  res.status(200).json({
    success: true,
    message: "User role updated successfully",
    user: user, // Optionally return the updated user
  });
});

// delete user role
const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler(`User with id ${req.params.id} not found`));
  }

  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "User Delete  successfully...",
  });
});

export {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
};
