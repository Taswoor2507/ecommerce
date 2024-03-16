import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/user.model.js";
import ErrorHandler from "../utils/errorHandler.js";
import getJWTandSetToCookies from "../utils/getJWT&SetToCookies.js";

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: { public_id: "avatar1000333", url: "avatar.com/taswoor" },
  });

  // const token = user.getJWTtoken();

  getJWTandSetToCookies(user, 201, res);
});

//login user

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
    console.log(isPasswordMatched);
    return next(new ErrorHandler("Invalid email or password ", 401));
  }

  getJWTandSetToCookies(user, 200, res);
});

//logout user

const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });

  res.status(200).json({
    success: true,
    message: "user logout successfully",
  });
});

export { registerUser, loginUser, logoutUser };
