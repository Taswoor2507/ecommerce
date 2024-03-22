import img from "../../assets/hero.png";

const Home = () => {
  return (
    <div className="w-full bg-[#e1dfe5] ">
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
  );
};

export default Home;
