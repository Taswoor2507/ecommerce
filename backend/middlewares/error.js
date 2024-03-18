import ErrorHandler from "../utils/errorHandler.js";

const catchError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  // mongo db error or cast error
  if (err.name === "CastError") {
    const message = `Resource not found ! , Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // mongodb duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered ..`;
    console.log(err.keyValue);
    err = new ErrorHandler(message, 400);
  }

  // json web token erro
  if (err.name === "JasonWebTokenError") {
    const message = `RJsonWebToken is invalid  try agian`;
    err = new ErrorHandler(message, 400);
  }

  // json web token expire error
  if (err.name === "TokenExpiredError") {
    const message = `RJsonWebToken is expired `;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default catchError;
