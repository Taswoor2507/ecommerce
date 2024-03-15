import Product from "../models/product.model.js";

//@controller --> create new product
// @access ---> admin

const createNewProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

//@controller --> get all products
// @access ---> all
const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
};

//@controller --> get  product detail
// @access ---> all

const getProductDetail = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    product,
  });
};

//@controller --> update  product
// @access ---> admin

const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
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
};

//@controller --> delete  product
// @access ---> admin

const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product Not found",
    });
  }
  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
};

export {
  getAllProducts,
  createNewProduct,
  getProductDetail,
  updateProduct,
  deleteProduct,
};
