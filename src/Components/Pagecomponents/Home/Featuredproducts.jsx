import React, { useEffect, useState, useContext } from "react";
import { CustomizeDots } from "../../CustomizeArrow/Arrow.jsx";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { IoStar, IoHeartOutline, IoHeart } from "react-icons/io5";
import Badge from "../Badge/Badge.jsx";
import api from "../../../Api/axios.js";
import { WishlistContext } from "../../../Context/WishlistContext"; // Adjust path if needed

const Featuredproducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Access wishlist context
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await api.get('/products/featured');
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const responsive = {
    desktop: { breakpoint: { max: 3200, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 3 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  if (loading) {
    return (
      <div className="w-full h-[600px] flex flex-row  items-center justify-center">
        <p>Loading featured products...</p>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center">
        <p>No featured products available.</p>
      </div>
    );
  }

  // Helper: check if product is in wishlist
  const isInWishlist = (productId) => wishlist.some(item => item._id === productId);

  return (
    <div className="bg-[#FAF0DD] w-full h-[600px] flex flex-col shadow-[0px_1px_8px_0px_rgba(117,117,117,0.08)]">
      {/* title */}
      <div className="flex items-center pt-10 justify-center">
        <span className="w-[25%] sm:block hidden  h-[1px] bg-[#F4E9CA]"></span>
        <div className="w-fit flex flex-col items-center gap-0.5">
          <h1 className="font-playfair font-[600] sm:text-[38px] text-2xl text-[#9B4E2B] tracking-[0.42px]">
            Our Featured Products
          </h1>
          <p className="font-poppins  font-[400] sm:text-[15px] text-sm text-[#414141] text-center leading-[20px]">
            Our finest selections, loved for their authenticity,
            <br />
            detail, and cultural essence.
          </p>
        </div>
        <span className="w-[25%] h-[1px] sm:block hidden bg-[#F4E9CA]"></span>
      </div>

      {/* products card */}
      <div className="mx-auto  relative w-full">
        <Carousel
          responsive={responsive}
          autoPlaySpeed={3000}
          infinite
          autoPlay={true}
          arrows={false}
          swipeable
          draggable
          keyBoardControl
          pauseOnHover
          showDots={true}
          containerClass="carousel-container h-[435px] w-11/12  mx-auto  "
          customDot={<CustomizeDots />}
        >
          {products.map((item) => {
            const inWishlist = isInWishlist(item._id);

            return (
              <div
                key={item._id}
                className="flex flex-col   gap-2 justify-center sm:w-[275px] w-[330px] relative sm:h-[336px] h-[360px] m-auto rounded-lg hover:shadow-md transition-all duration-300 group shadow-sm bg-white cursor-pointer"
              >
                {item.order && <Badge name={item.order} />}

                {/* Wishlist icon */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    if (inWishlist) {
                      removeFromWishlist(item._id);
                    } else {
                      addToWishlist(item);
                    }
                  }}
                  className="absolute top-4 right-3 cursor-pointer text-2xl"
                  aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                  {inWishlist ? (
                    <IoHeart className="text-red-600 text-base" />
                  ) : (
                    <IoHeartOutline className="text-red-600 text-base " />
                  )}
                </div>

                <div className="w-[275px]  h-[226px] flex items-center justify-center">
                  <img
                    src={Array.isArray(item.image) ? item.image[0] : item.image}
                    alt={item.name}
                    className="sm:w-32 w-40 sm:ml-7 ml-14 h-fit group-hover:scale-110 transition-all duration-300"
                  />
                </div>

                <div className="flex flex-col gap-2 px-4">
                  <div className="flex gap-0.5 items-center">
                    {[...Array(5)].map((_, i) => (
                      <IoStar key={i} className="text-orange-400" />
                    ))}
                    <span className="text-xs font-poppins font-[400] text-[#999999]">
                      ({item.rating || "4.2"})
                    </span>
                  </div>

                  <div className="flex gap-3 w-full">
                    <h2 className="flex-1 font-poppins font-[600] sm:text-base text-lg text-[#111827]">
                      {item.name}
                    </h2>
                    <span className="font-poppins font-[500] text-sm text-[#757575] text-right">
                      NRs.{item.price}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default Featuredproducts;
