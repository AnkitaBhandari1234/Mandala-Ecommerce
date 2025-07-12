import React, { useContext } from "react";
import { Product } from "../../../assets/Product.js";
import Delete from "../../../assets/Icons/delete.svg";
import { IoIosAdd, IoIosStar } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../../Context/CartContext.jsx";
import { GrFormSubtract } from "react-icons/gr";
const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useContext(CartContext);
  return (
    <div className="bg-[#FFF8E6]    ">
      <div className="flex  w-11/12 mx-auto">
        {/* for selected items */}
        <div className="w-[70%] mx-6 my-8 flex flex-col gap-7">
          <div className="bg-[#FCF2DD] flex flex-row  justify-between items-center rounded-lg px-3 py-2.5 shadow-[0px_1px_0px_0px_rgba(0,0,0,0.08)]">
            <label className="text-[#858585] font-poppins text-[16px] font-[400] uppercase flex items-center gap-3 ">
              <input
                type="checkbox"
                name="selesct"
                value="selectall"
                className="mr-2 w-4 h-4    rounded-[2px] bg-[#fff] accent-[#A0522D] border border-[#C4C4C4]  shadow-[0px_3px_2px_0px_rgba(0,0,0,0.08)]  "
              />
              select all items
            </label>
            <div className="">
              <button className="flex text-[#858585] font-poppins text-[15px] font-[400] gap-2">
                Delete
                <img src={Delete} alt="" />
              </button>
            </div>
          </div>

          <div className=" flex flex-col   ">
            {cart.length === 0 ? (
              <div className="text-center text-[#9B4E2B] font-medium py-10">
                Your cart is empty.
              </div>
            ) : (
              cart.map((val, i) => {
                return (
                  <div
                    className=" flex gap-5 bg-[#FCF2DD] items-center py-5 px-5 border-b-[1.5px] border-[#FFE9C1] shadow-[0px_1px_7px_0px_rgba(0,0,0,0.07)] "
                    key={i}
                  >
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
                        <img
                          src={Delete}
                          alt=""
                          className=" h-4 cursor-pointer "
                          onClick={() => removeFromCart(val.id)}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#BA4A20] font-poppins text-[15px] font-[500]">
                          {val.price}
                        </span>
                        <button className="bg-[#D9A441] font-[500] rounded-3xl text-white  px-5 py-1.5 flex items-center gap-4">
                          <GrFormSubtract
                            className="text-xl"
                            onClick={() => decreaseQuantity(val.id)}
                          />

                          {val.quantity}
                          <span>
                            <IoIosAdd
                              className="text-xl"
                              onClick={() => increaseQuantity(val.id)}
                            />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        {/* for total */}
        <div className="bg-[#FCF2DD] flex flex-col  gap-4 h-fit mt-28 rounded-2xl  w-[420px] px-6 py-4 font-poppins shadow-[0px_1px_5px_0px_rgba(0,0,0,0.07)]  ">
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
              <span className="text-[#414141] text-[14px] font-[500]">NO</span>
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
          <NavLink to="/checkout">
            <button
              type="submit"
              className="bg-[#BA4A20] w-full  py-2.5 rounded-full text-[16px] font-[400] text-white"
            >
              Proceed to Checkout
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Cart;
