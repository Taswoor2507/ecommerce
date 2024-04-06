import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../productSlice/ProductSlice.js";
import axios from "axios";

const initialState = {
  setStatus: STATUSES.PROCESSING,
  data: {},
};

const productDeatilsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    getDetails(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.setStatus = action.payload;
    },
  },
});

export default productDeatilsSlice.reducer;
export const { getDetails, setStatus } = productDeatilsSlice.actions;

// details thunk

const detailsThunk = (id) => {
  return async function (dispatch) {
    try {
      dispatch(setStatus(STATUSES.PROCESSING));
      const { data } = await axios.get(`/api/v1/product/${id}`);
      dispatch(getDetails(data));
      dispatch(setStatus(STATUSES.IDLE));
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
};

export { detailsThunk };
