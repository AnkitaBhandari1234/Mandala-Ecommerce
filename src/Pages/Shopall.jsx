import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { useUser } from "../Context/UserContext";
import Filter from "../Components/Pagecomponents/Filter/Filter";
import Sort from "../Components/Pagecomponents/Filter/Sort";

import Cart from "../assets/cart.svg";
import api from "../Api/axios";
import { IoIosHeart, IoIosStar } from "react-icons/io";
import { Link } from "react-router-dom";
import { WishlistContext } from "../Context/WishlistContext";
import { IoHeartOutline } from "react-icons/io5";

const ShopAll = () => {
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);
  const { addToCart, cart } = useContext(CartContext);
  const { user } = useUser();

  const navigate = useNavigate();

  const { category } = useParams();
  const categoryFromRoute =
    !category || category === "shop_all"
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
  }, [selectedSubcategories, sortOption, categoryFromRoute]);

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
        <div className="w-fit">
          <Filter
            categories={categories}
            selectedSubcategories={selectedSubcategories}
            toggleSubcategory={toggleSubcategory}
          />
        </div>

        <div className="w-9/12 flex flex-col items-end gap-7">
          <Sort setSortOption={setSortOption} />

          <div className="grid grid-cols-3 gap-5">
            {products.length === 0 && (
              <p className="text-center col-span-3">No products found.</p>
            )}
            {products.map((product) => {
              const inCart = cart.find((item) => item._id === product._id);
              const inWishlist = wishlist.find(
                (item) => item._id === product._id
              );
              return (
                <div
                  key={product._id}
                  className="bg-white w-[265px] rounded-2xl shadow-md"
                >
                  <Link to={`/product/${product._id}`}>
                    <div className="w-full h-[200px] relative">
                      <img
                        src={
                          product.image[0].startsWith("http")
                            ? product.image[0]
                            : `http://localhost:8000/${product.image[0].replace(
                                /^public\//,
                                ""
                              )}`
                        }
                        alt={product.name}
                        className="object-cover h-[200px] mx-auto"
                      />
                      <div
                        className="absolute top-3 right-4 text-base text-red-600 cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          inWishlist
                            ? removeFromWishlist(product._id)
                            : addToWishlist(product);
                        }}
                      >
                        {inWishlist ? <IoIosHeart /> : <IoHeartOutline />}
                      </div>
                    </div>
                  </Link>
                  <div className="px-3.5 pt-7 pb-4 flex flex-col gap-1">
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
                    <h4 className="text-[#414141] text-[14px] font-semibold font-poppins">
                      {product.name}
                    </h4>
                    <div className="flex gap-2 w-full font-poppins mt-3">
                      <div
                        className="bg-[#BA4A20] rounded-lg flex px-4 justify-center gap-4 cursor-pointer"
                        onClick={() => {
                          if (!user){
 alert("Please login to buy products.");
                            navigate("/signup");
                          }
                          else{

                            navigate("/checkout", {
                              state: {
                                selectedProducts: [{ ...product, quantity: 1 }],
                              },
                            })
                          }}
                        }
                      >
                        <button className="text-white text-[14px]">
                          Buy Now
                        </button>
                      </div>
                      <div
                        className="bg-[#D09300] rounded-lg flex gap-2 py-2 px-4 cursor-pointer"
                        onClick={() => {
                          if (!user) {
                            alert("Please login to add products to cart.");
                            navigate("/signup");
                          } else {
                            addToCart(product);
                          }
                        }}
                      >
                        <img src={Cart} alt="Cart" className="w-4" />
                        <button className="text-white text-[14px]">
                          Add to Cart
                        </button>
                      </div>
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
