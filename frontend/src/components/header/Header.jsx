import React from "react";
import { Link } from "react-router-dom";
import { IoCart } from "react-icons/io5";
const Header = () => {
  return (
    <div className="bg-slate-100">
      <div className=" h-16 flex items-center justify-between   px-8 max-w-[1240px] mx-auto">
        <div className="text-2xl font-bold">Logo</div>
        <div className="flex gap-4 items-center leading-3`">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="">All</Link>
          <Link to="/search">Search</Link>
        </div>
        <div>
          <IoCart />
        </div>
      </div>
    </div>
  );
};

export default Header;
