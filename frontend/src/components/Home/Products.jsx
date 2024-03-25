import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const options = {
  edit: false,
  color: "rgba(20,20,20,0.4)",
  activeColor: "tomato",
  value: 2.5,
  isHalf: true,
  size: window.innerWidth < 600 ? 20 : 25,
};

const Products = ({ product }) => {
  return (
    <div className="sm:w-[240px] xsm:w-[100%] xsm:flex-col gap-8 bg-[#e1dfe5] pb-2 shadow-md rounded-sm">
      <Link to={product._id}>
        <img
          src={product.images[0].url}
          className="w-[100%]"
          alt={product.name}
        />
        <p className="p-2">{product.name}</p>
        <div className="p-2 flex items-center">
          <ReactStars {...options} />
          <span className="pl-1 text-[12px]">(256 Reviews)</span>
        </div>
        <span className="p-2">
          <b>Price</b>: {product.price}
          <sub className="text-[10px]">PKR</sub>
        </span>
      </Link>
    </div>
  );
};

export default Products;
