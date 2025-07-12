import React from "react";
import { Product } from "../../../assets/Product.js";
import { IoIosStar } from "react-icons/io";

import Check from '../../../assets/Icons/check.png';

const Confirmation = () => {
  return (
    <div className="bg-[#FFF8E6]">
      <div className="w-11/12 mx-auto flex flex-col items-center gap-5 py-16">
      <img src={Check} alt="" className="w-[72px]"/>
        <div className="flex flex-col gap-2   text-center pb-10 ">
          <div className="flex flex-col leading-10">
            <h3 className="text-[#9B4E2B] font-playfair text-[40px] font-[500]">Thank You for Your Order!</h3>
            <p className="text-[#858585] font-poppins text-[15px]  font-[400] tracking-[0.16px]">Hi there! your order has been received</p>
          </div>
          <div className="text-[#414141] font-poppins text-[15px] font-[500]">
            <p>Order number: A3568</p>
            <p>Delivery Date: 2025/06/02</p>
          </div>
        </div>
        <div className="flex flex-row gap-6 mx-10 ">
          <div className=" flex flex-col w-[690px] h-full shadow-[0px_1px_7px_0px_rgba(0,0,0,0.07)]    ">
            {Product.slice(0, 2).map((val, i) => {
              return (
                
                <div
                  className="  flex gap-5 bg-[#F9EBD2] items-center py-6 px-7 border-b-[1.5px] border-[#FFE9C1]  "
                  key={i}
                >
                  
                  <div className="w-[170px] h-[125px] bg-white">
                    <img
                      src={val.image}
                      alt=""
                      className=" object-cover w-20 mx-auto   "
                    />
                  </div>
                  <div className="flex flex-col gap-3 pr-8 ">
                    <div className="flex flex-row  ">
                      <div className="">
                        <h4 className="text-[#3E2F1C] font-poppins text-[14px] font-[400] w-4/6 leading-4">
                          {val.subtitle}
                        </h4>
                        <span className="flex items-center text-[#999] font-poppins text-[11px] font-[400] tracking-[-0.12px] ">
                          <IoIosStar className="text-yellow-400 text-base" />
                          <IoIosStar className="text-yellow-400 text-base" />
                          <IoIosStar className="text-yellow-400 text-base" />
                          <IoIosStar className="text-yellow-400 text-base" />
                          <IoIosStar className="text-yellow-400 text-base" />

                          {val.rating}
                        </span>
                      </div>
                      
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#BA4A20] font-poppins text-[15px] font-[500]">
                        {val.price}
                      </span>
                      
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bg-[#F9EBD2] flex flex-col  gap-4 h-fit  rounded-2xl  w-[380px] px-6 py-4 font-poppins shadow-[0px_1px_5px_0px_rgba(0,0,0,0.07)]  ">
            <h2 className="text-[17px] font-[600] text-[#9B4E2B]">
              Order Summary
            </h2>
            <div className="flex flex-col gap-1.5">
              <div className="flex flex-row justify-between">
                <h4 className="text-[#858585] font-poppins text-[15px] font-[400]">
                  Subtotal
                </h4>
                <span className="text-[#414141] text-[14px] font-[500]">
                  NPR.1,050
                </span>
              </div>
              <div className="flex flex-row justify-between">
                <h4 className="text-[#858585] font-poppins text-[15px] font-[400]">
                  Discount
                </h4>
                <span className="text-[#414141] text-[14px] font-[500]">
                  NO
                </span>
              </div>
              <div className="flex flex-row justify-between">
                <h4 className="text-[#858585] font-poppins text-[15px] font-[400]">
                  Delivery fee
                </h4>
                <span className="text-[#414141] text-[14px] font-[500]">
                  NPR.50
                </span>
              </div>
            </div>
            <div className="flex flex-row justify-between border-t-[1.5px] border-[#F9E3B8] pt-2">
              <h3 className="text-[#858585] font-poppins text-[15px] font-[400]">
                Total
              </h3>
              <span className="text-[#414141] text-[14px] font-[500]">
                NPR.1,055
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
