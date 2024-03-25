import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const STATUSES = Object.freeze({
  PROCESSING: "processing",
  IDLE: "idle",
  ERROR: "error",
});

const initialState = {
  data: [],
  statusIs: STATUSES.PROCESSING,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getAllProducts(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.statusIs = action.payload;
    },
  },
});

export default productSlice.reducer;
export const { getAllProducts, setStatus } = productSlice.actions;

// thunk
function productThunk() {
  return async function productrequestThunk(dispatch) {
    dispatch(setStatus(STATUSES.PROCESSING));

    try {
      const { data } = await axios.get("/api/v1/products");
      dispatch(getAllProducts(data)); // Corrected 'res' to 'data'
      dispatch(setStatus(STATUSES.IDLE));
    } catch (error) {
      console.log(error.message);
      // dispatch(getAllProducts(null));
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

export { productThunk };
export { STATUSES };
