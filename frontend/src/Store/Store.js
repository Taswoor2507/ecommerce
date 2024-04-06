import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice/ProductSlice.js";
const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

export default store;
