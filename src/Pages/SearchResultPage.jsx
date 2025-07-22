import React, { useEffect, useState } from "react";
import api from "../Api/axios";
import { useLocation } from "react-router-dom";
import ProductCard from "../Components/UI/ProductCard";

const SearchResultPage = () => {
  const [products, setProducts] = useState([]);
  const query = new URLSearchParams(useLocation().search).get("keyword");

  useEffect(() => {
    if (query) {
      api
        .get(`/products/search?keyword=${query}`)
        .then((res) => {
          console.log("Search result:", res.data);
          setProducts(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [query]);

  return (
    <div className="p-6 bg-[#FFF8E6] min-h-screen">
      <h2 className="text-xl font-semibold mb-4">
        Search Results for "{query}"
      </h2>

      {products.length === 0 ? (
        <p className="text-3xl text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultPage;
