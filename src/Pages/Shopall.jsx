import React, { useContext, useState } from "react";
import Filter from "../Components/Pagecomponents/Filter/Filter";
import Sort from "../Components/Pagecomponents/Filter/Sort";

import { IoIosStar } from "react-icons/io";
import Cart from "../assets/cart.svg";
import Wishlist from "../assets/wishlist.svg";
import { Link } from "react-router-dom";

import { Product } from "../assets/Product.js";
import { CartContext } from "../Context/CartContext.jsx";
import AddToCartButton from "../Components/UI/AddtocartButton.jsx";

const Shopall = () => {
  const { addToCart } = useContext(CartContext);
  

  return (
    <div className="bg-[#FFF8E6] ">
      <div className=" w-11/12  mx-20 py-20 flex flex-row gap-4 ">
        {/* filter */}
        <div className="w-fit ">
          <Filter />
        </div>

        <div className="w-9/12 flex flex-col items-end gap-7  ">
          <Sort />
          {/* for products images */}
          <div className="border-t-[1.5px] border-[#F0E6D1] py-7">
            <div className="  grid grid-cols-3 gap-5   ">
              {Product.map((val, i) => {
                return (
                  <div
                    className="bg-white w-[265px] h-[350px] rounded-2xl shadow-md"
                    key={i}
                  >
                    {/* PRODUCT DETAIL PAGE */}
                    <Link to={`/product/${i}`}>
                      <div className="w-full h-[200px] relative ">
                        <img
                          src={val.image}
                          alt=""
                          className=" object-cover h-[200px] mx-auto"
                        />
                        <img
                          src={Wishlist}
                          alt=""
                          className="absolute top-5 right-5"
                        />
                      </div>
                    </Link>
                    {/* text-content */}
                    <div className="px-4 py-7 flex  flex-col gap-3">
                      <div className="flex justify-between ">
                        <p className="flex items-center text-[#999] font-poppins text-[12px] font-[400] trackinh-[-0.12px]">
                          <span className="flex ">
                            <IoIosStar className="text-yellow-400 text-base" />
                            <IoIosStar className="text-yellow-400 text-base" />
                            <IoIosStar className="text-yellow-400 text-base" />
                            <IoIosStar className="text-yellow-400 text-base" />
                            <IoIosStar className="text-yellow-400 text-base" />
                          </span>
                          {val.rating}
                        </p>
                        <span className="text-[#6B7280] font-poppins text-[13px] font-medium">
                          {val.price}
                        </span>
                      </div>
                      <h4 className="text-[#414141] font-poppins text-[14px] font-semibold">
                        {val.name}
                      </h4>

                      {/* ADD TO CART */}
                      <AddToCartButton product={val} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shopall;
