import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../Api/axios";
import { IoIosStar, IoIosHeart } from "react-icons/io";
import { IoHeartOutline } from "react-icons/io5";
import { WishlistContext } from "../../../Context/WishlistContext";
import { CartContext } from "../../../Context/CartContext";
import { useUser } from "../../../Context/UserContext";
import Cart from "../../../assets/cart.svg";

const Recommendations = ({ baseProduct }) => {
  const [recommended, setRecommended] = useState([]);
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommended = async () => {
      if (!baseProduct) return;

      try {
        const res = await api.post("/products/recommend", {
          tags: baseProduct.tags,
          attributes: baseProduct.attributes,
          productId: baseProduct._id, //  Send the current product ID to exclude
        });

        setRecommended(res.data);
      } catch (err) {
        console.error("Error fetching recommended products:", err);
      }
    };

    fetchRecommended();
  }, [baseProduct]);

  if (!recommended.length) return null;

  return (
    <div className="bg-[#FFF8E6] sm:px-20 px-8 mt-10">
      <h2 className="font-poppins text-[22px] font-medium mb-6 text-[#BA4A20]">
        You Might Also Like!
      </h2>
      <div className="grid sm:grid-cols-4 grid-cols-1 gap-5">
        {recommended.slice(0, 4).map((product) => {
          const inWishlist = wishlist.find((item) => item._id === product._id);

          return (
            <div
              key={product._id}
              className="bg-white w-full rounded-2xl shadow-md"
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
                    className="bg-[#BA4A20] rounded-lg flex sm:px-4 px-7 justify-center gap-4 cursor-pointer"
                    onClick={() => {
                      if (!user) {
                        alert("Please login to buy products.");
                        navigate("/signup");
                      } else {
                        navigate("/checkout", {
                          state: {
                            selectedProducts: [{ ...product, quantity: 1 }],
                          },
                        });
                      }
                    }}
                  >
                    <button className="text-white text-[14px]">Buy Now</button>
                  </div>
                  <div
                    className="bg-[#D09300] rounded-lg flex gap-2 py-2 sm:px-4 px-8 cursor-pointer"
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
  );
};

export default Recommendations;
