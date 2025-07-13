import React from "react";
import BannerImg from "../../../assets/banner_bg.png";
import BannerMandala from "../../../assets/banner.png";
import BannerBuddha from "../../../assets/banner2.png";
import { NavLink } from "react-router-dom";

const Herosection = () => {
  return (
    <div className="relative shadow-sm   ">
      <div className="  h-[500px] bg-cover   ">
        <img src={BannerImg} className="w-full h-full bg-contain " />
        <div className="bg-[#FEF7E9]/50 absolute top-0 right-0 bottom-0 left-0 "></div>
        <div className="absolute top-0 right-0 left-0 bottom-0 flex justify-between  w-11/12 mx-24  ">
          {/* text-section */}
          <div className="flex flex-col gap-9 justify-center  w-[50%] h-full   ">
            {/* for heading & slogan */}
            <div className="flex flex-col gap-5">
              <h1 className="font-playfair text-[42px] font-[600] text-[#D9A441]  leading-tight flex flex-col ">
                Discover Unique
                <span className="text-[#9B4E2B]">
Handcrafted Treasures </span>
              </h1>
              <p className="text-base font-[400] font-poppins text-[#414141] leading-tight w-5/6 ">
                Explore our curated collection  of authentic handmade
products crafted by skilled artisans from around the world

              </p>
            </div>
            {/* for shop button */}
            <NavLink to='/shop_all'>

              <button className="font-poppins bg-[#BA4A20] text-[16px] font-medium text-white w-[140px] h-[40px] rounded-lg">
                Shop Now
              </button>
            </NavLink>
            
          </div>

          {/* image section */}
          <div className=" relative  w-[45%] pl-14 overflow-clip     ">
            <div className=" overflow-clip w-[315px] h-fit ">
              <img
                src={BannerMandala}
                alt=""
                className=" w-fit  h-fit   animate-spinSlow     "
              />
            </div>
            <img
              src={BannerBuddha}
              alt=""
              className="absolute top-7 left-12 right-0 bottom-0    w-[343px]   h-[500px]   "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Herosection;
