import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { CartContext } from "../../../Context/CartContext";
import api from "../../../Api/axios.js";
import { toast } from "react-toastify";
import OtpPopup from "../../OTP/OtpPopup.jsx";

import ShippingForm from "./ShippingForm.jsx";
import ProductList from "./ProductList.jsx";
import PaymentOptions from "./PaymentOptions.jsx";
import OrderSummary from "./OrderSummart.jsx";

const Checkout = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const location = useLocation();

  const selectedFromState = location.state?.selectedProducts || [];

  const [selectedProducts, setSelectedProducts] = useState(() =>
    selectedFromState.length
      ? selectedFromState.map((item) => ({
          ...item,
          quantity: item.quantity || 1,
        }))
      : cart
  );

  // Quantities
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
    removeFromCart(id);
  };

  const subtotal = selectedProducts.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  // Shipping info state as an object
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    country: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  // OTP states
  const [otpSent, setOtpSent] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);

  const [transactionId] = useState(
    () => `order_${Date.now()}_${Math.floor(Math.random() * 1000)}`
  );

  const sendOtp = async () => {
    if (!formData.email) {
      toast.error("Please enter your email to receive OTP.");
      return;
    }
    setSendingOtp(true);
    try {
      const res = await api.post("/otp/send", { email: formData.email });
      if (res.data.success) {
        toast.success("OTP sent to your email!");
        setOtpSent(true);
        setShowOtpPopup(true);
      } else {
        toast.error("Failed to send OTP, please try again.");
      }
    } catch (error) {
      toast.error("Failed to send OTP, please try again.");
      console.error(error);
    }
    setSendingOtp(false);
  };

  const handleOtpVerified = () => {
    setOtpVerified(true);
    setShowOtpPopup(false);
    toast.success("OTP verified successfully!");
  };

 const handlePlaceOrder = async () => {
  if (!otpVerified) {
    toast.error("Please verify OTP before placing the order.");
    return;
  }

  const orderData = {
    orderItems: selectedProducts.map((item) => ({
      product: item._id,
      name: item.subtitle,
      image: item.image,
      price: item.price,
      qty: item.quantity,
    })),
    shippingAddress: formData,
    paymentMethod,
    totalPrice: total,
  };

  const token = localStorage.getItem("token");

  try {
    if (paymentMethod === "cod") {
      // Directly place the order for COD
      await api.post("/orders", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Order placed successfully!");
    } else if (paymentMethod === "esewa") {
      // Step 1: Save order details temporarily or pass it with payment (optional)
      const response = await api.post("/initiate-payment", {
        amount: total,
        productId: transactionId, // use this to track transaction/order
      });

      // Step 2: Redirect to eSewa
      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        toast.error("Failed to initiate eSewa payment");
      }
    } else {
      toast.error("Invalid payment method selected");
    }
  } catch (error) {
    console.error("Order/Payment error:", error);
    toast.error("Something went wrong. Please try again.");
  }
};


  return (
    <div className="bg-[#FFF8E6]">
      <div className="w-11/12 mx-auto h-fit flex sm:flex-row flex-col gap-12 sm:py-24 py-10 ">
        <div className="sm:w-[880px] flex flex-col gap-5 sm:pl-8">
          <ShippingForm formData={formData} setFormData={setFormData} />
          <ProductList
            selectedProducts={selectedProducts}
            increaseQty={increaseSelectedQty}
            decreaseQty={decreaseSelectedQty}
            removeProduct={removeSelectedProduct}
          />
        </div>
        <div className="flex flex-col gap-3 pr-8">
          <PaymentOptions
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            sendOtp={sendOtp}
            sendingOtp={sendingOtp}
            otpVerified={otpVerified}
          />
          <OrderSummary
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            total={total}
            paymentMethod={paymentMethod}
            transactionId={transactionId}
            otpVerified={otpVerified}
            handlePlaceOrder={handlePlaceOrder}
          />
        </div>
      </div>

      {showOtpPopup && (
        <OtpPopup
          email={formData.email}
          onClose={() => setShowOtpPopup(false)}
          onVerified={handleOtpVerified}
        />
      )}
    </div>
  );
};

export default Checkout;
