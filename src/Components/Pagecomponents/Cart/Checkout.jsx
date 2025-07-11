import React from "react";
import { Product } from "../../../assets/Product.js";
import { IoIosStar } from "react-icons/io";
import Delete from "../../../assets/Icons/delete.svg";
import Stripe from '../../../assets/Icons/stripe.png';
import Khalti from '../../../assets/Icons/khalti.png';

const Checkout = () => {
  return (
    <div className="bg-[#FFF8E6]">
      <div className="w-11/12 mx-auto h-[813px] flex gap-6">
        {/* left content */}
        <div className="w-[700px] flex flex-col gap-5 py-10">
          <div className="flex flex-col items-center   rounded-2xl gap-4 py-10 w-full bg-[#FCF2DD] font-poppins px-3 shadow-[0px_1px_7px_0px_rgba(0,0,0,0.07)]">
            <h3 className="text-[#414141] text-base font-[500] w-full text-left pl-8   ">
              Shipping Address
            </h3>
            <input
              type="email"
              placeholder="Email for Order Confirmation"
              className="py-2 px-4 rounded-md border border-[#D5D5D5] bg-[#FFF] text-[#999] font-inter text-xs font-[400] outline-none w-11/12"
            />
            <div className="flex gap-2 w-11/12 ">
              <input
                type="text"
                placeholder="First Name"
                className="w-[50%] py-2 px-4 rounded-md border border-[#D5D5D5] bg-[#FFF] text-[#999] font-inter text-xs font-[400] outline-none "
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-[50%] py-2 px-4 rounded-md border border-[#D5D5D5] bg-[#FFF] text-[#999] font-inter text-xs font-[400] outline-none "
              />
            </div>
            <input
              type="text"
              placeholder="Address"
              className="py-2 px-4 rounded-md border border-[#D5D5D5] bg-[#FFF] text-[#999] font-inter text-xs font-[400] outline-none w-11/12"
            />
            <input
              type="text"
              placeholder="Country"
              className="py-2 px-4 rounded-md border border-[#D5D5D5] bg-[#FFF] text-[#999] font-inter text-xs font-[400] outline-none w-11/12"
            />
            <input
              type="number"
              placeholder="Phone Number"
              className="py-2 px-4 rounded-md border border-[#D5D5D5] bg-[#FFF] text-[#999] font-inter text-xs font-[400] outline-none w-11/12"
            />
          </div>
          <div className=" w-fit font-poppins mt-5">
            <h1 className="text-[#414141] text-[14px] font-[500] mb-2">Delivery Options</h1>
            <div className="shadow-[0px_1px_7px_1px_rgba(0,0,0,0.07)] bg-[#FCF2DD] flex flex-col gap-2 px-3 py-3 rounded-xl">
              <h3 className="text-[#414141] text-[13px] font-[500]">Home delivery</h3>
              <p className="text-[11px] font-[400] text-[#858585]">Takes 3-5 busindess days</p>
            </div>
          </div>
           <div className=" flex flex-col     ">
                    {Product.slice(0,1).map((val, i) => {
                      return (
                        <div className=" rounded-2xl flex gap-5 bg-[#FCF2DD] items-center py-5 px-5 border-b-[1.5px] border-[#FFE9C1] shadow-[0px_1px_7px_0px_rgba(0,0,0,0.07)] " key={i}>
                          <input
                            type="checkbox"
                            name="selesct"
                            value="selectall"
                            className="mr-1.5 w-4 h-4    rounded-[2px] bg-[#fff] accent-[#A0522D] border border-[#C4C4C4]  shadow-[0px_1px_0px_0px_rgba(0,0,0,0.09)]  "
                          />
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
                                <h4 className="text-[#3E2F1C] font-poppins text-[14px] font-[500] w-5/6">
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
                              <img src={Delete} alt="" className=" h-4 " />
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-[#BA4A20] font-poppins text-[15px] font-[500]">
                                {val.price}
                              </span>
                              <button className="bg-[#D9A441] font-[500] rounded-3xl text-white px-5 py-1.5 flex gap-4">
                                <span>-</span>1<span>+</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
        </div>
        {/* right content */}
        <div className="bg-[#FCF2DD] flex flex-col  gap-4 h-fit mt-10 rounded-2xl  w-[420px] px-6 py-4 font-poppins shadow-[0px_1px_5px_0px_rgba(0,0,0,0.07)]  ">
        <h2 className="text-[17px] font-[600] text-[#9B4E2B]">Order Summary</h2>
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-row justify-between">
            <h4 className="text-[#858585] font-poppins text-[15px] font-[400]">Subtotal</h4>
            <span className="text-[#414141] text-[14px] font-[500]">NPR.1,050</span>
          </div>
          <div  className="flex flex-row justify-between">
            <h4 className="text-[#858585] font-poppins text-[15px] font-[400]">Discount</h4>
            <span className="text-[#414141] text-[14px] font-[500]">NO</span>
          </div>
          <div className="flex flex-row justify-between">
            <h4 className="text-[#858585] font-poppins text-[15px] font-[400]">Delivery fee</h4>
            <span className="text-[#414141] text-[14px] font-[500]">NPR.50</span>
          </div>
        </div>
        <div className="flex flex-row justify-between border-t-[1.5px] border-[#F9E3B8] pt-2">
          <h3 className="text-[#858585] font-poppins text-[15px] font-[400]">Total</h3>
          <span className="text-[#414141] text-[14px] font-[500]">NPR.1,055</span>
          </div>
          <div className="w-full flex  justify-center items-center gap-2">
            <img src={Khalti} alt="" className="w-10"/>
            <img src={Stripe} alt="" className="w-8 h-8 rounded" />
          </div>
          

          <button type="submit" className="bg-[#BA4A20] w-full  py-2.5 rounded-full text-[16px] font-[400] text-white">Proceed to Pay</button>
         
      </div>
      </div>
    </div>
  );
};

export default Checkout;
