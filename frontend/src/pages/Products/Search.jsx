import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  function submitSearchHandler(e) {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${encodeURIComponent(keyword)}`);
    } else {
      navigate("/products");
    }
  }

  return (
    <div>
      <div className="px-8 py-10  max-w-[1240px] mx-auto ">
        <form className="" onSubmit={submitSearchHandler}>
          <input
            type="text"
            placeholder="Search Products Here..."
            onChange={(e) => setKeyword(e.target.value)}
          />
          <input type="submit" value="Search" />
        </form>
      </div>
    </div>
  );
};

export default Search;
