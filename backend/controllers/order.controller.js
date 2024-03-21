import Order from "../models/order.model.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorHandler from "../utils/errorHandler.js";
import Product from "../models/product.model.js";

// create order
const newOrder = asyncHandler(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// get single order
const getSingleOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get login user order
const myOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  //   console.log(req.user._id);
  if (!orders) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }

  res.status(200).json({
    success: true,
    orders,
  });
});

//get all orders  --admin
const getAllOrders = asyncHandler(async (req, res, next) => {
  console.log(req.user);

  const orders = await Order.find();

  if (!orders) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    orders,
    totalAmount,
  });
});

//update order
const updateOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("order not found", 404));
  }
  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock -= quantity;

    product.save({ validateBeforeSave: false });
  }
  for (const orderItem of order.orderItems) {
    await updateStock(orderItem.product, orderItem.quantity);
  }

  order.orderStatus = req.body.status;
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    status: true,
    order,
  });
});

// delete order
const deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }

  await Order.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "order delete successfully",
  });
});

export {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
