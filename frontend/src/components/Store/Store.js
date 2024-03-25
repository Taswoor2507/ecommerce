import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./ProductSlice/ProductSlice.js";
const Store = configureStore({
  reducer: {
    product: productReducer,
  },
});

export default Store;
