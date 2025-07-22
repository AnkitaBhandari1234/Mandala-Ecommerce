import React from "react";
import BannerImg from "../../../assets/banner_bg.png";
import Decor from "../../../assets/ShopbyCategory/decor.png";
import Textiles from "../../../assets/ShopbyCategory/textiles.png";
import Ceramics from "../../../assets/ShopbyCategory/ceramics.png";
import Jewelry from "../../../assets/ShopbyCategory/jewelry.png";
import Artifact from "../../../assets/ShopbyCategory/artifact.png";
import Wellness from "../../../assets/ShopbyCategory/wellness.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CustomizeDots } from "../../CustomizeArrow/Arrow";
import { PiArrowRightLight } from "react-icons/pi";

import { Link } from "react-router-dom";
const ShopbyCategory = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3200, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const shopallProducts = [
    {
      path: "/decor",
      image: Decor,
      name: "Decor",
      description: "Wall hangings, statues, mandala art",
    },
    {
      path: "/textiles",
      image: Textiles,
      name: "Textiles",
      description: "Shawls, dhaka fabrics, cushion covers",
    },
    {
      path: "/jewelry",
      image: Jewelry,
      name: "Jewelry",
      description: "Beaded necklaces, silver, ethnic earrings ",
    },
    {
      path: "/ceramics",
      image: Ceramics,
      name: "Ceramics",
      description: " Traditional pottery, cups, plates",
    },
    {
      path: "/artifact",
      image: Artifact,
      name: "Artifacts",
      description: " Brass statues, masks, prayer wheels",
    },
    {
      path: "/wellness",
      image: Wellness,
      name: "Wellness",
      description: "Herbal oils, incense, copper bottles",
    },
  ];

  return (
    <div className="relative shadow-[0px_1px_8px_0px_rgba(117,117,117,0.08)]   ">
      <img src={BannerImg} className="w-full h-[630px]     " />
      <div className="bg-[#FDF2DDCC]/90 absolute top-0 right-0 bottom-0 left-0   "></div>
      <div className="absolute top-0 flex flex-col w-full gap-10   ">
        {/* for text */}
        <div className=" flex   items-center justify-center h-[120px]  pt-16  ">
          <span className="w-[25%] h-[1px] col-span-1 bg-[#F4E9CA] sm:block hidden    "></span>

          <div className="w-fit  flex flex-col items-center sm:gap-0.5 gap-2    ">
            <h1 className="font-playfair font-semibold sm:text-[38px] text-3xl text-[#9B4E2B] sm:mx-10 tracking-[0.42px]  ">
              Shop By Category
            </h1>
            <p className="font-poppins font-[400] sm:text-[15px] text-xs text-[#414141] text-center sm:leading-[20px]    ">
              Discover handcrafted items across various categories,
              <br /> each piece telling its own unique story
            </p>
          </div>
          <span className="w-[25%] h-[1px]  bg-[#F4E9CA] sm:block hidden "></span>
        </div>
        {/* for cards */}
        <div className=" w-full relative      ">
          <Carousel
            responsive={responsive}
            autoPlaySpeed={4000}
            infinite={false}
            autoPlay={true}
            arrows={false}
            swipeable
            draggable
            keyBoardControl
            pauseOnHover
            showDots={true}
            containerClass="carousel-container h-[435px]  w-11/12 mx-auto   "
            className="  "
            customDot={<CustomizeDots />}
          >
            {shopallProducts.map((item, index) => {
              return (
                <Link
                  to={item.path}
                  key={index}
                  className="bg-white sm:h-[366px] h-[370px] sm:w-[275px] w-[330px] flex flex-col gap-2 m-auto rounded-lg shadow-sm cursor-pointer group transition-all duration-300 ease-in-out no-underline"
                >
                  <div className="h-[270px] sm:w-[275px] w-[330px] flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={`${item.name} image`}
                      className="w-fit h-full rounded-t-lg object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-2 h-[78px] w-[275px] rounded-lg px-4">
                    <div>
                      <h1 className="text-[#9B4E2B] font-poppins font-medium sm:text-xl text-2xl -tracking-wide">
                        {item.name}
                      </h1>
                    </div>
                    <div className="flex items-center gap-1 w-[132px] h-[32px] border-[1.4px] border-[#BA4A20] rounded-lg group-hover:bg-[#FAF0DD] group-hover:border-none transition-colors duration-300 justify-center">
                      <span className="text-[#BA4A20] font-[400] text-sm font-poppins">
                        Explore More
                      </span>
                      <PiArrowRightLight
                        className="text-[#BA4A20] stroke-[4]"
                        size={22}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default ShopbyCategory;
