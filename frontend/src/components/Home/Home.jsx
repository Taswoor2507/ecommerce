import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import img from "../../assets/hero.png";
import { STATUSES, productThunk } from "../Store/ProductSlice/ProductSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { data, statusIs } = useSelector((state) => state.product);
  console.log(data);
  useEffect(() => {
    dispatch(productThunk());
  }, [dispatch]);
  console.log(statusIs);
  return (
    <div className="w-full">
      <div className="bg-[#e1dfe5] w-full">
        <div className="max-w-[1200px] mx-auto py-9 sm:gap-1 px-6 sm:px-10 flex sm:flex-row flex-col sm:justify-between xsm:flex-col xsm:items-center xsm:flex-1">
          <div className="self-center">
            <h2 className="text-4xl xl:text-6xl text-[#02050a]">
              Picked every item with care,{" "}
            </h2>
            <h1 className="text-4xl xl:text-6xl font-bold text-[#100e34]">
              You must try
            </h1>
            <button className="border-none outline-none hover:shadow-md bg-[#fa9f42] text-white px-6 mt-5 font-semibold py-3 rounded-lg">
              Discover More
            </button>
          </div>
          <div>
            <img
              src={img}
              className="self-center lg:h-[400px] md:h-[350px] sm:h-[250px]"
              alt="Hero"
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto py-9 sm:gap-1 px-6 sm:px-10">
        <div className="text-center text-4xl font-semibold mb-6">
          Featured Products
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          {statusIs === STATUSES.PROCESSING ? (
            // console.log("loading")
            <div className="h-[100vh] bg-red-600">Loading</div>
          ) : data && data.products ? (
            data.products.map((product) => {
              const options = {
                edit: false,
                color: "rgba(20,20,20,0.4)",
                activeColor: "tomato",
                value: product.rating,
                isHalf: true,
                size: window.innerWidth < 600 ? 20 : 25,
              };
              return (
                <div
                  key={product._id}
                  className="sm:w-[240px] xsm:w-[100%] xsm:flex-col gap-8 bg-[#e1dfe5] pb-2 shadow-md rounded-sm"
                >
                  <Link to={product._id}>
                    <img
                      src={product.images[0].url}
                      className="w-[100%] h-[250px] object-cover"
                      alt={product.name}
                    />
                    <p className="p-2">{product.name}</p>
                    <div className="p-2 flex items-center">
                      <ReactStars {...options} />
                      <span className="pl-1 text-[12px]">
                        ({product.noOfReviews})
                      </span>
                    </div>
                    <span className="p-2">
                      <b>Price</b>: {product.price}
                      <sub className="text-[10px]">PKR</sub>
                    </span>
                  </Link>
                </div>
              );
            })
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
