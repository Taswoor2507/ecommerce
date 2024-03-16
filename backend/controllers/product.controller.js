import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/product.model.js";
import ErrorHandler from "../utils/errorHandler.js";
import ApiFeatures from "../utils/apiFeatures.js";
//@controller --> create new product
// @access ---> admin

const createNewProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);

  if (!product) {
    return next(new ErrorHandler("Product creation failed try again", 400));
  }

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

export {
  getAllProducts,
  createNewProduct,
  getProductDetail,
  updateProduct,
  deleteProduct,
};
