import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../../Api/axios";
import wishlistImage from "../../../assets/wishlist.svg";
import CartImage from "../../../assets/cart.svg";

import { IoIosAdd, IoIosStar } from "react-icons/io";
import { GrFormSubtract } from "react-icons/gr";
import Review from "../Review.jsx/Review";
import ReviewPost from "../Review.jsx/ReviewPost";
import RecommendationProducts from "../RecommendationProduct/RecommendProduct";
import { useUser } from "../../../Context/UserContext";
import { useContext } from "react";
import { WishlistContext } from "../../../Context/WishlistContext";
import { CartContext } from "../../../Context/CartContext";

const Productdetails = () => {

  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1); // default 1
 
const navigate = useNavigate();

const { user } = useUser();
const { addToCart } = useContext(CartContext);
const { addToWishlist, removeFromWishlist, wishlist } = useContext(WishlistContext);




// Check if product is already in wishlist
const inWishlist = wishlist.some((item) => item._id === product._id);

      // to add quantity
    const increaseQuantity = () => {
  setQuantity(prev => prev + 1);
};

const decreaseQuantity = () => {
  if (quantity > 1) {
    setQuantity(prev => prev - 1);
  }
};
//fetch product by id
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await api.get(`products/${id}`); // check your backend URL
        setProduct(res.data);
      } catch (err) {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();


  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;
  // functional butto  handlers
  const handleAddToCart = () => {
  if (!user) return navigate("/signup");
  addToCart({ ...product, quantity });
};

const handleBuyNow = () => {
  if (!user) return navigate("/signup");

  navigate("/checkout", {
    state: {
      selectedProducts: [{ ...product, quantity }],
    },
  });
};

const handleWishlist = () => {
  if (!user) return navigate("/signup");

  inWishlist
    ? removeFromWishlist(product._id)
    : addToWishlist(product);
};

  // State to hold all submitted reviews

  // Function to add a new review (called from ReviewForm)
  const addReview = (review) => {
    setReviews([review, ...reviews]);
  };

  return (
    <div className="py-14 flex flex-col gap-14">
      {/* //product details */}
      <div className="flex flex-row bg-[#FFF2DC] mx-20  gap-14 px-14 py-4 rounded-lg shadow-[0px_1px_0px_0px_rgba(0,0,0,0.09)]">
        <div className="w-[480px] h-[240px] bg-white my-5 pt-9  ">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-36   mx-auto  "
          />
        </div>
        <div className="flex flex-col gap-3 my-5 ">
          <div className="flex  ">
            <h3 className="text-[#414141] font-poppins text-xl font-medium w-4/6 leading-6">
              {product.subtitle}
            </h3>
            <img src={wishlistImage} alt="" className="w-6 mb-5"    onClick={handleWishlist} />
          </div>
          <p className="flex items-center text-[#999] text-[15px]">
            <span className="flex">
              {[...Array(5)].map((_, i) => (
                <IoIosStar key={i} className="text-yellow-400 text-xl" />
              ))}
            </span>
            ({product.rating})
          </p>
          <span className="text-[#BA4A20] font-poppins text-xl font-medium pb-3">
            NRs.{product.price}
          </span>
          <div className="flex gap-2">
            <button className="bg-[#BA4A20] font-poppins text-white text-sm font-[400] rounded-lg px-14 py-3"  onClick={handleBuyNow}>
              Buy Now
            </button>
            <button className="flex items-center gap-3 text-sm font-[400] bg-[#D09300] rounded-lg text-white px-12 py-3 "  onClick={handleAddToCart}>
              <img src={CartImage} alt="" className="w-4" />
              Add to Cart
            </button>
          </div>
          <p className="flex gap-2 items-center text-[#414141] font-poppins font-medium text-[14px] pt-2 ">
            Quantity
            <button className="bg-[#D9A441]  font-[500] rounded-3xl text-white  px-3 py-1.5 flex items-center justify-center gap-4 w-fit">
              <GrFormSubtract
                className="text-xl"
                onClick={decreaseQuantity}
              />

              {quantity}
              <span>
                <IoIosAdd
                  className="text-xl"
                 onClick={increaseQuantity}
                />
              </span>
            </button>
          </p>
          <p className="text-[#414141] font-poppins text-[15px] tracking-[-0.16px] font-[400] w-5/6 leading-5 pb-10 mt-4  ">
            {product.overview}
          </p>
        </div>
      </div>
      {/* product description */}
      <div className="flex flex-row gap-16 h-fit px-20">
        <div className="bg-white w-[750px] h-[300px] ">
          <img src={product.image} alt={product.name} className="w-48 mx-12 mt-14" />
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="font-poppins font-[500] text-[22px] text-[#414141] tracking-[-0.22px]">
            Product Details
          </h1>
          <ul className="list-disc flex flex-col gap-7 ">
            {product.description.map((point, index) => {
              return (
                <li
                  key={index}
                  className="font-poppins text-[15px]  tracking-[0.32px] leading-5"
                >
                  {point}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {/* product review  and forms */}
      <Review rating={4.5} onReviewSubmit={addReview} />
      <div className="mx-20">
      <h1 className="text-[#414141] text-[22px] font-poppins font-medium tracking-[-0.22px]">
        See what our customers have to say
      </h1>
      {reviews.length === 0 ? (
        <p>NO reviews yet.</p>
      ) : (
        <div className="  grid grid-cols-2 gap-6 mx-auto ">
          {reviews.map((revi, i) => (
            <div key={i} className="rounded-lg shadow-[0px_1px_0px_0px_rgba(0,0,0,0.09)] bg-[#FFF0D4] px-6 py-3">
              <ReviewPost review={revi} />
            </div>
          ))}
        </div>
      )}
      </div>

      {/* rexommeded similar products */}
      <RecommendationProducts baseProduct={product}/>
    </div>
  );
};

export default Productdetails;
