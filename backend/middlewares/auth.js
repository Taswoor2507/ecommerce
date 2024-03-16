import ErrorHandler from "../utils/errorHandler.js";
import asyncHandler from "./asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const authenticatedUser = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  //   console.log(token);
  if (!token || token === "j%3Anull") {
    return next(
      new ErrorHandler("Please login first to access to this resource", 401)
    );
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
});

const authRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role : ${req.user.role} can not allowed to access this resource `
        )
      );
    }

    next();
  };
};

export default authenticatedUser;
export { authRole };
