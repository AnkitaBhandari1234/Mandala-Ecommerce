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
import StockStatus from "../../Stock/StockStatus";
import { toast } from "react-toastify";

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
  const { addToWishlist, removeFromWishlist, wishlist } =
    useContext(WishlistContext);

  // before rendering or inside component body, after loading wishlist and product
  const inWishlist = product
    ? wishlist.some((item) => item._id === product._id)
    : false;

  // to add quantity
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    } else {
      // Popup alert when stock limit reached
      alert("Sorry, no more stock available.");
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  //fetch product by id
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await api.get(`products/${id}`); // check your backend URL
        setProduct(res.data);

        const reviewRes = await api.get(`reviews/${id}`);
        setReviews(reviewRes.data);
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
    addToCart({ ...product, quantity,countInStock: product.stock });
  };

  const handleBuyNow = () => {
    if (!user) return navigate("/signup");

    navigate("/checkout", {
      state: {
        selectedProducts: [{ ...product, quantity,countInStock: product.stock }],
      },
    });
  };

  const handleWishlist = () => {
    if (!user) return navigate("/signup");

    inWishlist ? removeFromWishlist(product._id) : addToWishlist(product);
  };

  // State to hold all submitted reviews

  // Function to add a new review (called from ReviewForm)
const addReview = async (review) => {
  try {
    const res = await api.post("/reviews", {...review });

    const updatedReviews = await api.get(`reviews/${product._id}`);
    setReviews(updatedReviews.data);
    toast.success("Review submitted!");
  } catch (err) {
   

    if (
      err.response &&
      err.response.status === 400 &&
      err.response.data.message ===
        "You have already submitted a review for this product."
    ) {
      toast.warning("You have already submitted a review for this product.");
    } else {
      toast.error("Failed to submit review");
    }
    throw err;
  }
};


  

  return (
    <div className="py-14 flex flex-col gap-14">
      {/* //product details */}
      <div className="flex sm:flex-row flex-col bg-[#FFF2DC] sm:mx-20 mx-5  gap-14 sm:px-14 px-4 py-4 rounded-lg shadow-[0px_1px_0px_0px_rgba(0,0,0,0.09)]">
        <div className="sm:w-[500px]   sm:h-[280px]   bg-white sm:my-5  sm:pt-9   ">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover sm:w-36 w-48   mx-auto  "
          />
        </div>
        <div className="flex flex-col gap-3 sm:my-5 ">
          <div className="flex  ">
            <h3 className="text-[#414141] font-poppins text-xl font-medium sm:w-4/6 leading-6">
              {product.subtitle}
            </h3>
            <img
              src={wishlistImage}
              alt=""
              className="w-6 mb-5"
              onClick={handleWishlist}
            />
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
          <div className="flex gap-2 ">
            <button
              className={`bg-[#BA4A20] font-poppins text-white text-sm font-[400] rounded-lg sm:px-14 px-8 py-3 ${
                product.stock === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleBuyNow}
              disabled={product.stock === 0}
            >
              Buy Now
            </button>
            <button
              className={`flex items-center gap-3 text-sm font-[400] bg-[#D09300] rounded-lg text-white sm:px-12 px-10 py-3 ${
                product.stock === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <img src={CartImage} alt="" className="sm:w-4" />
              Add to Cart
            </button>
          </div>
          <p className="flex gap-2 items-center text-[#414141] font-poppins font-medium text-[14px] pt-2 ">
            Quantity
            <button className="bg-[#D9A441]  font-[500] rounded-3xl text-white  px-3 py-1.5 flex items-center justify-center gap-4 w-fit">
              <GrFormSubtract className="text-xl" onClick={decreaseQuantity} />

              {quantity}
              <span>
                <IoIosAdd className="text-xl" onClick={increaseQuantity} />
              </span>
            </button>
          </p>
          {
            product.stock===0?<span className="text-red-600 font-semibold text-sm mt-1">
      Out of Stock
    </span>: <StockStatus stock={product.stock} />
          }
         

          <p className="text-[#414141] font-poppins text-[15px] tracking-[-0.16px] font-[400] sm:w-5/6 leading-5 pb-10 mt-4  ">
            {product.overview}
          </p>
        </div>
      </div>
      {/* product description */}
      <div className="flex sm:flex-row flex-col gap-16 h-fit sm:px-20 px-8">
        <div className="bg-white sm:w-[750px]   sm:h-[310px] ">
          <img
            src={product.image}
            alt={product.name}
            className="sm:w-48 w-32 sm:mx-12 mx-20 "
          />
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

  <Review rating={4.5} onReviewSubmit={addReview} productId={product._id} />

      <div className="sm:mx-20 mx-4">
        <h1 className="text-[#414141] mb-3 sm:text-[22px] text-lg font-poppins font-medium tracking-[-0.22px]">
          See what our customers have to say
        </h1>
        {reviews.length === 0 ? (
          <p className="font-poppins text-base font-[400]">NO reviews yet.</p>
        ) : (
          <div className="  grid sm:grid-cols-2 gap-6    mx-auto ">
            {reviews.map((revi, i) => (
              <div
                key={i}
                className="rounded-lg shadow-[0px_1px_0px_0px_rgba(0,0,0,0.09)] bg-[#FFF0D4] px-6 py-3"
              >
                <ReviewPost review={revi} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* rexommeded similar products */}
      <RecommendationProducts baseProduct={product} />
    </div>
  );
};

export default Productdetails;
