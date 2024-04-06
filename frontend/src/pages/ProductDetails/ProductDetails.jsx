// ProductDetails.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsThunk } from "../../Store/productDetailSlice/ProductDetailsSlice.js";
import { useParams } from "react-router-dom";
import { STATUSES } from "../../Store/productSlice/ProductSlice.js";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, setStatus } = useSelector((state) => state.productDetails);
  useEffect(() => {
    dispatch(detailsThunk(id));
  }, [dispatch, id]);

  if (setStatus === STATUSES.PROCESSING) {
    return <div>Loading</div>;
  }

  if (setStatus === STATUSES.ERROR) {
    return <div>Error in fetching product details </div>;
  }
  const { product } = data;
  return (
    <div>
      <div className="flex gap-8 my-2">
        <div>
          <img src="https://img.freepik.com/free-photo/young-woman-beautiful-yellow-dress_1303-17544.jpg?w=740" />
        </div>
        <div>
          <h1 className="text-2xl">{product.name}</h1>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
