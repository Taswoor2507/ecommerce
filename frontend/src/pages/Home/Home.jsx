import React from "react";
import Products from "./Products.jsx";
const Home = () => {
  return (
    <div>
      <div className="px-8 max-w-[1240px] mx-auto ">
        <div className="py-16 relative">
          <div className="">
            <h1 className=" mb-2 text-4xl md:text-6xl  font-semibold">
              Welcome to{" "}
            </h1>
            <h1 className="text-6xl mb-2 md:text-8xl font-bold text-orange-500">
              Pakistan's
            </h1>
            <h1 className=" md:text-6xl  text-4xl font-semibold">
              Digital Store
            </h1>
          </div>
          <button className="border-black border px-8 py-3 mt-8 hover:border   hover:border-white  hover:bg-orange-500 hover:text-white transition">
            Get Started
          </button>
        </div>
        <div className="pb-16 flex gap-6 flex-wrap">
          <Products imageLink="https://img.freepik.com/free-photo/young-woman-beautiful-yellow-dress_1303-17544.jpg?w=740" />
        </div>
      </div>
    </div>
  );
};

export default Home;
