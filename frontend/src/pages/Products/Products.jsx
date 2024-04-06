import React from "react";
import AllProducts from "../Home/Products.jsx";
const Products = () => {
  return (
    <div>
      <div className="px-8 py-10  max-w-[1240px] mx-auto ">
        <div className="pb-16 flex gap-6 flex-wrap">
          <AllProducts imageLink="https://img.freepik.com/free-photo/young-woman-beautiful-yellow-dress_1303-17544.jpg?w=740" />
        </div>
      </div>
    </div>
  );
};

export default Products;
