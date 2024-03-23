import img from "../../assets/hero.png";
import Products from "./Products.jsx";

const product = {
  name: "Tshirt",
  images: [
    {
      url: "https://img.freepik.com/free-photo/front-view-young-female-courier-blue-uniform-posing-holding-brown-delivery-cup-coffee-pink-wall-service-job-uniform-delivery-woman_140725-33657.jpg?t=st=1711218262~exp=1711221862~hmac=62b54ee606fdff5cfa9adb7557e4ba055823956f5e5296a4251e5e137f342af0&w=740",
    },
  ],
  price: 1200,
  _id: "Taswoor Hossein",
};
const Home = () => {
  return (
    <div className="w-full ">
      <div className="bg-[#e1dfe5]  w-full">
        <div className="max-w-[1200px] mx-auto py-9  sm:gap-1 px-6  sm:px-10 flex sm:flex-row flex-col sm:justify-between xsm:flex-col xsm:items-center xsm:flex-1">
          <div className="self-center">
            <h2 className="text-4xl xl:text-6xl text-[#02050a]">
              Picked every item with care ,{" "}
            </h2>
            <h1 className="text-4xl  xl:text-6xl font-bold  text-[#100e34]">
              You must try
            </h1>
            <button className="border-none outline-none hover:shadow-md   bg-[#fa9f42] text-white px-6  mt-5 font-semibold py-3 rounded-lg">
              Discover More
            </button>
          </div>
          <div>
            <img
              src={img}
              className=" self-center lg:h-[400px] md:h-[350px] sm:h-[250px]"
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto py-9  sm:gap-1 px-6  sm:px-10">
        <div className="text-center text-4xl font-semibold mb-6">
          Featured Products
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <Products product={product} />
          <Products product={product} />
          <Products product={product} />
          <Products product={product} />

          <Products product={product} />
          <Products product={product} />
          <Products product={product} />
          <Products product={product} />
        </div>
      </div>
    </div>
  );
};

export default Home;
