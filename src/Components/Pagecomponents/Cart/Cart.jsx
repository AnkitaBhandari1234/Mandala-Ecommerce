import React, { useContext } from "react";

import Delete from "../../../assets/Icons/delete.svg";
import { IoIosAdd, IoIosStar } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../../Context/CartContext.jsx";
import { GrFormSubtract } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../Context/UserContext.jsx";
const Cart = () => {
  const navigate = useNavigate();
  const { user } = useUser(); // get the logged-in user
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart,selectedItems, toggleSelectItem} =
    useContext(CartContext);
      //Calculate subtotal, delivery fee, total
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = 50; // you can change this logic later
  const total = subtotal + deliveryFee;

  // handle checkout
  const handleCheckout = () => {
      if (!user) {
    alert("Please login to proceed to checkout.");
    navigate("/signup"); // redirect to register/login
    return;
  }
  const selectedProducts = cart.filter(item => selectedItems.includes(item._id));
  navigate("/checkout", { state: { selectedProducts } });
};
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
                    className=" flex gap-5 bg-[#FCF2DD] items-center  py-5 px-5 border-b-[1.5px] border-[#FFE9C1] shadow-[0px_1px_7px_0px_rgba(0,0,0,0.07)] "
                    key={i}
                  >
                    <input
                      type="checkbox"
                      name="select"
                              checked={selectedItems.includes(val._id)}
  onChange={() => toggleSelectItem(val._id)}
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
                    <div className="flex flex-col   gap-3 pr-8 w-full">
                      <div className="flex flex-row justify-between  ">
                        <div className="">
                          <h4 className="text-[#3E2F1C] font-poppins text-[15px] font-[400] w-4/6 leading-5">
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
                          onClick={() => removeFromCart(val._id)}
                        />
                      </div>
                      <div className="flex justify-between items-center ">
                        <span className="text-[#BA4A20] font-poppins text-[15px] font-[500]">
                          NRs.{val.price}
                        </span>
                        <button className="bg-[#D9A441] font-[500] rounded-3xl text-white  px-3 py-1.5 flex items-center justify-center gap-4">
                          <GrFormSubtract
                            className="text-xl"
                            onClick={() => decreaseQuantity(val._id)}
                          />

                          {val.quantity}
                          <span>
                            <IoIosAdd
                              className="text-xl"
                              onClick={() => increaseQuantity(val._id)}
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
                NRs.{subtotal}
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
                NRs.{deliveryFee}
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-between border-t-[1.5px] border-[#F9E3B8] pt-2">
            <h3 className="text-[#858585] font-poppins text-[15px] font-[400]">
              Total
            </h3>
            <span className="text-[#414141] text-[14px] font-[500]">
             NRs.{total}
            </span>
          </div>
          
            <button
              onClick={handleCheckout}
              className="bg-[#BA4A20] w-full  py-2.5 rounded-full text-[16px] font-[400] text-white"
            >
              Proceed to Checkout
            </button>
          
        </div>
      </div>
    </div>
  );
};

export default Cart;
