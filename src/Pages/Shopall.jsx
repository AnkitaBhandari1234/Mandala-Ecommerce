import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../Context/ProductContext";
import Filter from "../Components/Pagecomponents/Filter/Filter";
import Sort from "../Components/Pagecomponents/Filter/Sort";
import ProductCard from "../Components/UI/ProductCard";
import api from "../Api/axios";

const ShopAll = () => {
  const { refreshProducts } = useProduct();

  const { category } = useParams();
  const categoryFromRoute =
    !category || category === "shop_all" || category === "search"
      ? null
      : category.charAt(0).toUpperCase() + category.slice(1);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = {};

        if (selectedSubcategories.length > 0) {
          params.subcategory = selectedSubcategories.join(",");
        }

        if (categoryFromRoute) {
          params.category = categoryFromRoute;
        }

        const response = await api.get("/products", { params });
        let data = response.data;

        data = [...data].sort((a, b) => {
          switch (sortOption) {
            case "priceAsc":
              return a.price - b.price;
            case "priceDesc":
              return b.price - a.price;
            case "rating":
              return b.rating - a.rating;
            default:
              return 0;
          }
        });

        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [selectedSubcategories, sortOption, categoryFromRoute, refreshProducts]);

  const toggleSubcategory = (subcategory) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory)
        ? prev.filter((s) => s !== subcategory)
        : [...prev, subcategory]
    );
  };

  const filteredCategories = categoryFromRoute
    ? categories.filter(
        (cat) => cat.category.toLowerCase() === categoryFromRoute.toLowerCase()
      )
    : categories;

  return (
    <div className="bg-[#FFF8E6]">
      <div className="w-11/12 sm:mx-20 mx-8 py-20 flex sm:flex-row flex-col gap-4">
        <div className="w-fit">
          <Filter
            categories={filteredCategories}
            selectedSubcategories={selectedSubcategories}
            toggleSubcategory={toggleSubcategory}
          />
        </div>

        <div className="w-9/12 flex flex-col sm:items-end sm:gap-7 gap-4">
          <Sort setSortOption={setSortOption} />

          <div className="grid sm:grid-cols-3 grid-cols-1 sm:gap-5 gap-8">
            {products.length === 0 ? (
              <p className="text-center col-span-3">No products found.</p>
            ) : (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopAll;
