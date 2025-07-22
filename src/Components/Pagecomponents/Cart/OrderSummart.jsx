import React from "react";
import Esewa from "../../../assets/Icons/esewa.png";
import EsewaPayment from '../../Esewa/EsewaPayment'

const OrderSummary = ({
  subtotal,
  deliveryFee,
  total,
  paymentMethod,
  transactionId,
  otpVerified,
  handlePlaceOrder,
}) => {
  return (
    <div className="bg-[#F9EBD2] flex flex-col gap-4 h-fit mt-10 rounded-2xl sm:w-[420px] w-[350px] sm:px-6 px-3 py-4 font-poppins shadow-[0px_1px_5px_0px_rgba(0,0,0,0.07)]">
      <h2 className="text-[17px] font-[600] text-[#9B4E2B]">Order Summary</h2>
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-row justify-between">
          <h4 className="text-[#858585] font-poppins text-[15px] font-[400]">
            Subtotal
          </h4>
          <span className="text-[#414141] text-[14px] font-[500]">NRs.{subtotal}</span>
        </div>
        <div className="flex flex-row justify-between">
          <h4 className="text-[#858585] font-poppins text-[15px] font-[400]">Discount</h4>
          <span className="text-[#414141] text-[14px] font-[500]">NO</span>
        </div>
        <div className="flex flex-row justify-between">
          <h4 className="text-[#858585] font-poppins text-[15px] font-[400]">
            Delivery fee
          </h4>
          <span className="text-[#414141] text-[14px] font-[500]">NRs.{deliveryFee}</span>
        </div>
      </div>
      <div className="flex flex-row justify-between border-t-[1.5px] border-[#F9E3B8] pt-2">
        <h3 className="text-[#858585] font-poppins text-[15px] font-[400]">Total</h3>
        <span className="text-[#414141] text-[14px] font-[500]">NRs.{total}</span>
      </div>
      <div className="w-fit mx-auto">
        <img src={Esewa} alt="esewa" className="w-8 h-8 rounded" />
      </div>

      {paymentMethod === "esewa" ? (
        <EsewaPayment amount={total} transactionId={transactionId} />
      ) : (
        <button
          type="submit"
          onClick={handlePlaceOrder}
          disabled={!otpVerified }
          className={`bg-[#BA4A20] w-full py-2.5 rounded-full text-[16px] font-[400] text-white ${
            !otpVerified ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
         {paymentMethod === "cod" ? "Place Order" : "Proceed to Pay with eSewa"}
        </button>
      )}
    </div>
  );
};

export default OrderSummary;
