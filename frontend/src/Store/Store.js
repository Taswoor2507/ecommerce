import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice/ProductSlice.js";
import ProductDetailsReducer from "./productDetailSlice/ProductDetailsSlice.js";
const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails: ProductDetailsReducer,
  },
});

export default store;
