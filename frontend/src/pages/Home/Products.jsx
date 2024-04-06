import React, { useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { productThunk } from "../../Store/productSlice/ProductSlice.js";
import { Link } from "react-router-dom";

const Products = ({ imageLink }) => {
  const dispatch = useDispatch();
  const { data, setStatus } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(productThunk());
  }, [dispatch]);

  if (setStatus === "processing") {
    return <div>Loading...</div>;
  }

  // Remove this block as we're handling the error with toast
  // if (setStatus === "error") {
  //   return <div>Error fetching products</div>;
  // }

  const { products } = data;
  return (
    <>
      {products.map((product) => {
        return (
          <Link
            to={product._id}
            key={product._id}
            className="w-[250px] bg-slate-100 rounded-md overflow-hidden cursor-pointer hover:shadow-md"
          >
            <img
              src={imageLink}
              className="w-[100%] aspect-square object-cover object-right hover:scale-[1.02] transition-all"
            />
            <div className="pt-2 px-2">
              <h1 className="text-[14px] font-bold">{product.name}</h1>
              <h2 className="font-light text-2xl my-1 text-slate-600">
                PKR:{product.price}
              </h2>
              <div>
                <ReactStars
                  count={5}
                  size={26}
                  isHalf={true}
                  activeColor="orange"
                  value={2.5}
                />
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default Products;
