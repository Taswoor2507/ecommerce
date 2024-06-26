import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const STATUSES = Object.freeze({
  PROCESSING: "processing",
  IDLE: "idle",
  ERROR: "error",
});
const initialState = {
  data: [],
  setStatus: STATUSES.PROCESSING,
};
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getAllProducts(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.setStatus = action.payload;
    },
  },
});

export default productSlice.reducer;
export const { getAllProducts, setStatus } = productSlice.actions;

// use thunk
// _____________________________

const productThunk = (keyword = "", currentPage = 1) => {
  return async function (dispatch) {
    try {
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}`;
      dispatch(setStatus(STATUSES.PROCESSING));
      const { data } = await axios.get(link);
      dispatch(getAllProducts(data));
      dispatch(setStatus(STATUSES.IDLE));
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
      console.log(error);
    }
  };
};

export { productThunk };
export { STATUSES };
