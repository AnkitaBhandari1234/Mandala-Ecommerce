import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import Filter from "../Components/Pagecomponents/Filter/Filter";
import Sort from "../Components/Pagecomponents/Filter/Sort";
import Wishlist from "../assets/wishlist.svg";
import Cart from "../assets/cart.svg";
import api from "../Api/axios";
import { IoIosStar } from "react-icons/io";
import { Link } from "react-router-dom";

const ShopAll = () => {
  const { category } = useParams(); // get category from URL
  const { addToCart, cart } = useContext(CartContext);

  // If category is 'shop_all' or undefined, show all products
  const categoryFromRoute =
    !category || category === "shop_all"
      ? null
      : category.charAt(0).toUpperCase() + category.slice(1);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [sortOption, setSortOption] = useState(""); // "priceAsc", "priceDesc", "rating"

  // Fetch categories on mount
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

  // Fetch products whenever filters, sort, or category changes
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

        // Sorting
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
  }, [selectedSubcategories, sortOption, categoryFromRoute]);

  // Toggle subcategory selection (for filter UI)
  const toggleSubcategory = (subcategory) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory)
        ? prev.filter((s) => s !== subcategory)
        : [...prev, subcategory]
    );
  };

  return (
    <div className="bg-[#FFF8E6]">
      <div className="w-11/12 mx-20 py-20 flex gap-4">
        {/* Filter Sidebar */}
        <div className="w-fit">
          <Filter
            categories={categories}
            selectedSubcategories={selectedSubcategories}
            toggleSubcategory={toggleSubcategory}
          />
        </div>

        {/* Sorting and Products */}
        <div className="w-9/12 flex flex-col items-end gap-7">
          <Sort setSortOption={setSortOption} />

          <div className="grid grid-cols-3 gap-5 ">
            {products.length === 0 && (
              <p className="text-center col-span-3">No products found.</p>
            )}
            {products.map((product) => {
              const inCart = cart.find((item) => item._id === product._id);
              return (
                <div
                  key={product._id}
                  className="bg-white w-[265px] h-fit rounded-2xl shadow-md"
                >
                  <Link to={`/product/${product._id}`}>
                    <div className="w-full h-[200px] relative">
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        className="object-cover h-[200px] mx-auto"
                      />
                      <img
                        src={Wishlist}
                        alt="Wishlist"
                        className="absolute top-5 right-5"
                      />
                    </div>
                  </Link>
                  <div className="px-4 py-7 flex flex-col gap-3">
                    <div className="flex justify-between">
                      <p className="flex items-center text-[#999] text-[12px]">
                        <span className="flex">
                          {[...Array(5)].map((_, i) => (
                            <IoIosStar
                              key={i}
                              className="text-yellow-400 text-base"
                            />
                          ))}
                        </span>
                        {product.rating}
                      </p>
                      <span className="text-[#6B7280] text-[13px] font-medium">
                        Nrs.{product.price}
                      </span>
                    </div>
                    <h4 className="text-[#414141] text-[15px] font-semibold ">
                      {product.name}
                    </h4>

                    <div
                      className="bg-[#BA4A20] rounded-lg flex py-2 justify-center gap-4 cursor-pointer"
                      onClick={() => addToCart(product)}
                    >
                      <button className="text-white text-[16px]">Add to Cart</button>
                      <img src={Cart} alt="Cart" className="w-5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopAll;
