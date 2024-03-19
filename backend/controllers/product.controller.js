import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/product.model.js";
import ErrorHandler from "../utils/errorHandler.js";
import ApiFeatures from "../utils/apiFeatures.js";
import User from "../models/user.model.js";
//@controller --> create new product
// @access ---> admin

const createNewProduct = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  // const userId = req.user.id;
  const product = await Product.create(req.body);

  if (!product) {
    return next(new ErrorHandler("Product creation failed try again", 400));
  }
  const adminPerson = await User.findById(req.user.id);
  console.log(
    `Admin (${adminPerson.name}) add this product at (${adminPerson.createdAt})`
  );

  res.status(201).json({
    success: true,
    product,
  });
});

//@controller --> get all products
// @access ---> all
const getAllProducts = asyncHandler(async (req, res, next) => {
  const resultPerPage = 6;
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;
  if (!products) {
    return next(new ErrorHandler("Product Not found", 400));
  }

  res.status(200).json({
    success: true,
    products,
  });
});

//@controller --> get  product detail
// @access ---> all

const getProductDetail = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

//@controller --> update  product
// @access ---> admin

const updateProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  res.status(200).json({
    success: true,
    updatedProduct,
  });
});

//@controller --> delete  product
// @access ---> admin

const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

// product rewiews

const productReview = asyncHandler(async (req, res, next) => {
  const { comment, rating, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.noOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    message: "thanks for rating our product",
  });
});

// get all reviews
const getReviews = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// delete review

const deleteReview = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter((rev) => {
    return rev.id.toString() !== req.query.id.toString();
  });

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  const ratings = avg / product.reviews.length;
  const noOfReviews = product.reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, ratings, noOfReviews },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

export {
  getAllProducts,
  createNewProduct,
  getProductDetail,
  updateProduct,
  deleteProduct,
  productReview,
  getReviews,
  deleteReview,
};
