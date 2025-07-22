import React from "react";

const PaymentOptions = ({
  paymentMethod,
  setPaymentMethod,
  sendOtp,
  sendingOtp,
  otpVerified,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[#414141] font-poppins text-[15px] font-[500]">
        Payment options
      </h2>
      <div className="flex flex-col gap-5">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="radio"
            className="mt-1"
            checked={paymentMethod === "cod"}
            onChange={() => setPaymentMethod("cod")}
          />
          <div className="flex flex-col">
            <span className="text-[#3E2F1C] font-inter text-[13px] font-[500] tracking-[0.14px] capitalize">
              cash on delivery
            </span>
            <span className="text-[#858585] text-[13px] font-[400] tracking-[0.3px]">
              Pay with cash upon delivery
            </span>
          </div>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="radio"
            className="mt-1"
            checked={paymentMethod === "esewa"}
            onChange={() => setPaymentMethod("esewa")}
          />
          <div className="flex flex-col">
            <span className="text-[#3E2F1C] font-inter text-[13px] font-[500] tracking-[0.14px] capitalize">
              digital wallet
            </span>
            <span className="text-[#858585] text-[13px] font-[400] tracking-[0.3px]">
              Pay with your esewa
            </span>
          </div>
        </label>
      </div>

      <button
        onClick={sendOtp}
        disabled={sendingOtp || otpVerified}
        className={`mt-4 py-2 rounded-full w-full text-white font-semibold ${
          otpVerified
            ? "bg-green-600 cursor-not-allowed"
            : "bg-[#BA4A20] hover:bg-[#a03910]"
        }`}
      >
        {sendingOtp
          ? "Sending OTP..."
          : otpVerified
          ? "OTP Verified ✓"
          : "Send OTP & Verify"}
      </button>
    </div>
  );
};

export default PaymentOptions;
