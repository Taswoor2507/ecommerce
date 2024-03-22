import { HiOutlineShoppingCart } from "react-icons/hi";
import logo from "../../../assets/logo.png";
const Header = () => {
  return (
    <div className="w-full bg-[#100e343e] ">
      <div className="max-w-[1200px] mx-auto px-6  py-3 pb-4 sm:px-10 flex items-center justify-between">
        <div className="relative">
          <img src={logo} className="  w-[80px] " />
        </div>
        <div className="text-red-700  items-center mt-2 text-[16px] font-normal gap-6 sm:flex hidden">
          <p className="text-black">Home</p>
          <p className="text-black">About</p>
          <p className="text-black">Products</p>
        </div>

        <div>
          <HiOutlineShoppingCart className="text-[20px]  mt-2" />
        </div>
      </div>
    </div>
  );
};

export default Header;
