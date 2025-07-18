import React from "react";
import Badge from "../Pagecomponents/Badge/Badge";
import { Link } from "react-router-dom";
import Facebook from "../../assets/facebooklogo.png";
import Instagram from "../../assets/instagramlogo.png";
import Twitter from "../../assets/twitterlogo.png";
import CopyrightImage from "../../assets/copyrightimage.png";

const Footer = () => {
  const quicklinks = [
    {
      name: "Shop by Category",
    },
    {
      name: "All Products",
    },
    {
      name: "Best Sellers",
    },
    {
      name: "New Arrivals",
    },
  ];

  const categories = [
    {
      name: "Decor",
      path: "/decor",
    },
    {
      name: "Textiles",
      path: "/textiles",
    },
    {
      name: "Jewelry",
      path: "/jewelry",
    },
    {
      name: "Ceramics",
      path: "/ceramics",
    },
    {
      name: "Artifacts",
      path: "/artifacts",
    },
    {
      name: "Wellness",
      path: "/wellness",
    },
  ];
  return (
    <div className="bg-[#3B1F16] ">
      <div className="  flex sm:flex-row flex-col   gap-8   justify-between  sm:h-[300px] pt-12 sm:px-20 px-4    ">
        {/* for logo */}
        <div className=" flex flex-col  sm:w-[25%]    ">
          <h1 className="font-inter font-bold text-5xl text-white  mb-5">
            Logo
          </h1>
          <p className="font-poppins font-[400] text-sm tracking-normal text-[#FAF0E6]">
            A Celebration of Nepal’s Timeless Craft. Each Piece Handpicked, Each
            Detail Honored.
          </p>
        </div>
        <div className="flex justify-between gap-16 ">
        {/* for quick links */}
        <div className="flex flex-col gap-3    ">
          <h2 className="font-poppins font-medium text-lg text-[#FAF0E6] ">
            Quick Links
          </h2>
          <ul className="flex flex-col gap-3 w-full">
            {quicklinks.map((item, index) => (
              <Link key={index}>
                <li className="font-poppins font-[400] text-sm text-[#F5F5F5] tracking-wide">
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        {/* for categories */}
        <div className="flex flex-col gap-3  ">
          <h2 className=" font-poppins font-medium text-lg text-[#FAF0E6]">
            Categories{" "}
          </h2>
          <ul className="flex flex-col gap-3">
            {categories.map((item, index) => (
              <Link key={index} to={item.path}>
                <li className="font-poppins font-[400] text-sm text-[#F5F5F5] tracking-wide">
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        </div>
        <div className="flex justify-between gap-16 mb-9 ">
        {/* for support */}
        <div className="flex flex-col gap-3  ">
          <h1 className="font-poppins font-medium text-lg text-[#FAF0E6]">
            Support
          </h1>
          <ul className="flex flex-col gap-3">
            <li className="font-poppins font-[400] text-sm text-[#F5F5F5] tracking-wide">
              FAQs
            </li>
            <li className="font-poppins font-[400] text-sm text-[#F5F5F5] tracking-wide">
              Shipping & Returns
            </li>
            <li className="font-poppins font-[400] text-sm text-[#F5F5F5] tracking-wide">
              Contact Us
            </li>
            <li className="font-poppins font-[400] text-sm text-[#F5F5F5] tracking-wide">
              Terms & Conditions
            </li>
            <li className="font-poppins font-[400] text-sm text-[#F5F5F5] tracking-wide">
              Privacy Policy
            </li>
          </ul>
        </div>
          {/* for icons */}
        <div className="flex  flex-col  gap-3    mx-auto   ">
          <span className="font-poppins capitalize font-medium text-lg tracking-wide text-[#FAF0E6] ">
            Follow us
          </span>
          <div className="w-[21px] flex gap-2">
            <img src={Facebook} alt="social media image" />
            <img src={Instagram} alt="social media image" />
            <img src={Twitter} alt="social media image" />
          </div>
        </div>
        </div>

     
      </div>
      {/* for copyright and icons */}
      <div className="bg-[#2E140B]  flex sm:flex-row flex-col items-center   gap-y-4  sm:py-2 py-7 sm:px-20 px-3    ">
        {/* for copyright */}
        <div className="flex gap-0.5 w-full sm:flex-row flex-col  items-center font-poppins font-[400] text-sm text-[#FAF0E6] tracking-wider ">
          Copyright
          <img src={CopyrightImage} alt="" className="w-4 h-4" />
          <span className="font-poppins font-[400] text-sm text-[#FAF0E6] ">
            2025 MANDALA MOOL. All rights reserved.
          </span>
        </div>
      
           {/* for becoming seller */}
        
          <Link to="/become-seller" className="w-full sm:text-right text-center my-1">
            <button className="bg-white  text-[#3B1F16] font-poppins font-semibold px-3  py-1.5 rounded-full shadow-md hover:bg-[#F5F5F5] transition">
              Become a Seller
            </button>
          </Link>

        


       
      </div>
    </div>
  );
};

export default Footer;
