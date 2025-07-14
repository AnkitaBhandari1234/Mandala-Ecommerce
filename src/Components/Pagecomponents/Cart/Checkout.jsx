import React, { useContext, useState } from "react";
import { Product } from "../../../assets/Product.js";
import { IoIosAdd, IoIosStar } from "react-icons/io";
import Delete from "../../../assets/Icons/delete.svg";
import Stripe from "../../../assets/Icons/stripe.png";
import Khalti from "../../../assets/Icons/khalti.png";
import { useLocation } from "react-router-dom";
import { GrFormSubtract } from "react-icons/gr";
import { CartContext } from "../../../Context/CartContext";
const Checkout = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const location = useLocation();

  const selectedFromState = location.state?.selectedProducts || [];

  const [selectedProducts, setSelectedProducts] = useState(() => {
    return selectedFromState.length
      ? selectedFromState.map((item) => ({
          ...item,
          quantity: item.quantity || 1,
        }))
      : cart;
  });
  const increaseSelectedQty = (id) => {
    setSelectedProducts((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseSelectedQty = (id) => {
    setSelectedProducts((prev) =>
      prev.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };
  const removeSelectedProduct = (id) => {
    setSelectedProducts((prev) => prev.filter((item) => item._id !== id));
  };

  const subtotal = selectedProducts.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;
  return (
    <div className="bg-[#FFF8E6]">
      <div className="w-11/12 mx-auto h-fit flex gap-12 py-24 ">
        {/* left content */}
        <div className="w-[880px] flex flex-col gap-5 pl-8 ">
          <div className="flex flex-col items-center   rounded-2xl gap-4 py-10 w-full bg-[#F9EBD2] font-poppins px-3 shadow-[0px_1px_7px_0px_rgba(0,0,0,0.07)]">
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
            <h1 className="text-[#414141] text-[14px] font-[500] mb-2">
              Delivery Options
            </h1>
            <div className="shadow-[0px_1px_7px_1px_rgba(0,0,0,0.07)] bg-[#F9EBD2] flex flex-col gap-2 px-3 py-3 rounded-xl">
              <h3 className="text-[#414141] text-[13px] font-[500]">
                Home delivery
              </h3>
              <p className="text-[11px] font-[400] text-[#858585]">
                Takes 3-5 busindess days
              </p>
            </div>
          </div>
          <div className=" flex flex-col w-[650px]      ">
            {selectedProducts.map((val, i) => {
              return (
                <div
                  className=" flex gap-5 bg-[#FCF2DD] items-center  py-5 px-5 border-b-[1.5px] border-[#FFE9C1] shadow-[0px_1px_7px_0px_rgba(0,0,0,0.07)] "
                  key={i}
                >
                  <input
                    type="checkbox"
                    name="select"
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
                        onClick={() => {
                          removeFromCart(val._id); // optional, if you want to update cart context as well
                          removeSelectedProduct(val._id); // update local state so UI updates
                        }}
                      />
                    </div>
                    <div className="flex justify-between items-center ">
                      <span className="text-[#BA4A20] font-poppins text-[15px] font-[500]">
                        NRs.{val.price}
                      </span>
                      <button className="bg-[#D9A441] font-[500] rounded-3xl text-white  px-3 py-1.5 flex items-center justify-center gap-4">
                        <GrFormSubtract
                          className="text-xl"
                          onClick={() => decreaseSelectedQty(val._id)}
                        />

                        {val.quantity}
                        <span>
                          <IoIosAdd
                            className="text-xl"
                            onClick={() => increaseSelectedQty(val._id)}
                          />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* right content */}
        <div className="flex flex-col gap-3 pr-8">
          {/* payment options */}
          <div className="flex flex-col gap-4   ">
            <h2 className="text-[#414141] font-poppins text-[15px] font-[500]">
              Payment options
            </h2>
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <input type="radio" className="mt-1 " />
                <p className="flex flex-col">
                  <span className="text-[#3E2F1C] font-inter text-[13px] font-[500] tracking-[0.14px] capitalize">
                    cash on delivery
                  </span>
                  <span className="text-[#858585] text-[13px] font-[400] tracking-[0.3px]">
                    Pay with cash upon delivery
                  </span>
                </p>
              </div>
              <div className="flex items-start gap-3 ">
                <input type="radio" className="mt-1" />
                <p className="flex flex-col ">
                  <span className="text-[#3E2F1C] font-inter text-[13px] font-[500] tracking-[0.14px] capitalize">
                    Direct Bank Transfer
                  </span>
                  <span className="text-[#858585] text-[13px] font-[400] tracking-[0.3px]">
                    Make payment directly through bank account.
                  </span>
                </p>
              </div>
              <div className="flex items-start gap-3 ">
                <input type="radio" className="mt-1" />
                <p className="flex flex-col">
                  <span className="text-[#3E2F1C] font-inter text-[13px] font-[500] tracking-[0.14px] capitalize">
                    digital wallet
                  </span>
                  <span className="text-[#858585] text-[13px] font-[400] tracking-[0.3px]">
                    Pay with your khalti, esewa
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2.5 mt-2 ">
              <h4 className="text-[#3E2F1C] text-[15px] font-[400] font-inter ">
                Review & Place Order
              </h4>
              <p className="text-[#414141] text-[13px] font-[400] font-inter tracking-[0.14px] leading-4">
                Please review the order details and payment details before
                proceeding to confirm your order{" "}
              </p>
              <div className="flex gap-2">
                <input type="checkbox" />
                <p className="text-[#414141] text-[12px] font-inter font-[400]">
                  I agree to the{" "}
                  <span className="text-[#BA4A20]">Terms & conditions</span>,{" "}
                  <span className="text-[#BA4A20]">Privacy policy</span> &{" "}
                  <span className="text-[#BA4A20]">Return policy</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="text-[#414141] text-[12px] font-inter font-[400]">
                  Sign me up to the email list
                </span>
              </div>
            </div>
          </div>
          {/* order summary */}
          <div className="bg-[#F9EBD2] flex flex-col  gap-4 h-fit mt-10 rounded-2xl  w-[420px] px-6 py-4 font-poppins shadow-[0px_1px_5px_0px_rgba(0,0,0,0.07)]  ">
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
                <span className="text-[#414141] text-[14px] font-[500]">
                  NO
                </span>
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
            <div className="w-full flex  justify-center items-center gap-2">
              <div className="flex items-center gap-1">
                <input type="radio" />
                <img src={Khalti} alt="" className="w-10" />
              </div>
              <div className="flex items-center gap-2">
                <input type="radio" />

                <img src={Stripe} alt="" className="w-8 h-8 rounded" />
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#BA4A20] w-full  py-2.5 rounded-full text-[16px] font-[400] text-white"
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
