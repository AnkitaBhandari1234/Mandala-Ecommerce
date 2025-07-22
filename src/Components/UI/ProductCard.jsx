import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosHeart, IoIosStar } from "react-icons/io";
import { IoHeartOutline } from "react-icons/io5";
import Cart from "../../assets/cart.svg";
import { useUser } from "../../Context/UserContext";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";

const ProductCard = ({ product }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  const { addToCart, cart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);

  const inWishlist = wishlist.find((item) => item._id === product._id);
  const inCart = cart.find((item) => item._id === product._id);

  const imageUrl = product.image[0].startsWith("http")
    ? product.image[0]
    : `http://localhost:8000/${product.image[0].replace(/^public\//, "")}`;
    
      const isOutOfStock = product.stock === 0;
  return (
    <div className="bg-white sm:w-[265px] w-[320px] rounded-2xl shadow-md">
      <Link to={`/product/${product._id}`}>
        <div className="w-full h-[200px] relative">
          <img
            src={imageUrl}
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
            className="bg-[#BA4A20] rounded-lg flex sm:px-4 px-6 justify-center gap-4 cursor-pointer"
            onClick={() => {
              if (!user) {
                alert("Please login to buy products.");
                navigate("/signup");
              } else {
                navigate("/checkout", {
                  state: { selectedProducts: [{ ...product, quantity: 1 }] },
                });
              }
            }}
          >
            <button className="text-white text-[14px]">Buy Now</button>
          </div>

          <div
            className="bg-[#D09300] rounded-lg flex gap-2 py-2 sm:px-4 px-9 cursor-pointer"
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
              {inCart ? "In Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
