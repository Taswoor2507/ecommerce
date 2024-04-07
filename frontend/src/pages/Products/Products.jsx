import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productThunk } from "../../Store/productSlice/ProductSlice";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
const Products = () => {
  const dispatch = useDispatch();
  const { data, setStatus } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const { keyword } = useParams();
  useEffect(() => {
    dispatch(productThunk(keyword, currentPage));
  }, [dispatch, keyword, currentPage]);

  if (setStatus === "processing") {
    return <div>Loading...</div>;
  }
  const { products, resultPerPage, productsCount } = data;
  console.log(resultPerPage, productsCount);
  function setCurrentPageNo(e) {
    console.log(e);
    setCurrentPage(e);
  }
  return (
    <div>
      <div className="px-8 py-10  max-w-[1240px] mx-auto ">
        <div className="pb-16 flex gap-6 flex-wrap">
          <>
            {products.length > 0 ? (
              products.map((product) => {
                return (
                  <Link
                    to={`/product/${product._id}`}
                    key={product._id}
                    className="w-[250px] bg-slate-100 rounded-md overflow-hidden cursor-pointer hover:shadow-md"
                  >
                    <img
                      src="https://img.freepik.com/free-photo/young-woman-beautiful-yellow-dress_1303-17544.jpg?w=740"
                      className="w-[100%]  aspect-square object-cover object-right hover:scale-[1.02] transition-all"
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
              })
            ) : (
              <div>No product Found</div>
            )}
          </>
        </div>
        {productsCount > resultPerPage && (
          <div>
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
