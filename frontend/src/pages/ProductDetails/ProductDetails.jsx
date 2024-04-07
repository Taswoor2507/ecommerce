// ProductDetails.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsThunk } from "../../Store/productDetailSlice/ProductDetailsSlice.js";
import { useParams } from "react-router-dom";
import { STATUSES } from "../../Store/productSlice/ProductSlice.js";
import ReactStars from "react-rating-stars-component";
import Reviews from "./Reviews.jsx";

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
    <div className="px-8 max-w-[1240px] mx-auto my-4">
      <div className="flex gap-8 my-2">
        <div>
          <img src="https://img.freepik.com/free-photo/young-woman-beautiful-yellow-dress_1303-17544.jpg?w=740" />
        </div>
        <div>
          <div className="pt-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-[20px] text-gray-500">ProductID#{product._id}</p>
            <p className="mt-4 text-[20px] font-semibold">
              Category
              <span className="text-[20px] font-normal ml-4">
                {product.category}
              </span>
            </p>
          </div>
          <div className=" mt-8 flex items-center  border-slate-300 border-t-[1px] border-b-[1px]">
            <ReactStars
              edit={false}
              count={5}
              size={40}
              isHalf={true}
              activeColor="orange"
              value={product.ratings}
            />
            <p className="text-2xl">({product.noOfReviews})</p>
          </div>
          <div>
            <div className="mt-8 flex items-center ">
              <button className="text-[30px] px-4 bg-slate-100 shadow-md">
                +
              </button>
              <input
                type="number"
                className="border w-14 p-2 bg-slate-950 text-white"
              />
              <button className="text-[30px] px-4  bg-slate-100 shadow-md">
                -
              </button>
              <button className="bg-orange-500 text-white px-8 py-2 hover:bg-orange-600 hover:shadow-md transition-all ml-4 rounded-lg">
                Add to cart
              </button>
            </div>
          </div>

          <div className="mt-4  border-slate-300 border-t-[1px] border-b-[1px]">
            <p className="text-slate-400 ">
              {" "}
              {product.stock < 0 ? "OutOf Stock" : "Avalaible"}
            </p>
          </div>
          <div className="text-gray-400 mt-4">
            <p>{product.description}</p>
          </div>
          <div>
            <button className="bg-orange-500 text-white px-8 py-2 hover:bg-orange-600 hover:shadow-md transition-all rounded-lg mt-4 hover:scale-[1.04]">
              Add review
            </button>
          </div>
        </div>
      </div>
      <div className="mt-12 flex">
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review) => {
            return <Reviews key={review._id} review={review} />;
          })
        ) : (
          <div className="text-2xl text-center ">No Rewiew Yet</div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
