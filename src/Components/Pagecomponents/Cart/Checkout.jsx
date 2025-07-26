import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { CartContext } from "../../../Context/CartContext";
import { useProduct } from "../../../Context/ProductContext.jsx";
import api from "../../../Api/axios.js";
import { toast } from "react-toastify";
import OtpPopup from "../../OTP/OtpPopup.jsx";
import { useNavigate } from "react-router-dom";
import ShippingForm from "./ShippingForm.jsx";
import ProductList from "./ProductList.jsx";
import PaymentOptions from "./PaymentOptions.jsx";
import OrderSummary from "./OrderSummart.jsx";
import { useEffect } from "react";



const Checkout = () => {
  const navigate = useNavigate(); 
  const { triggerRefresh } = useProduct();
  const { cart, removeFromCart } = useContext(CartContext);
  const location = useLocation();
    const [selectedProducts, setSelectedProducts] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [otpVerified, setOtpVerified] = useState(false);
  const [hasOrdered, setHasOrdered] = useState(false);
  const [transactionId] = useState(
    () => `order_${Date.now()}_${Math.floor(Math.random() * 1000)}`
  );
  
  



  // Quantities
  const increaseSelectedQty = async (id) => {
    // Get current stock from backend for this product
    try {
      const res = await api.get(`/products/${id}`);
      const stock = res.data.stock;

      setSelectedProducts((prev) =>
        prev.map((item) => {
          if (item._id === id) {
            if (item.quantity < stock) {
              return { ...item, quantity: item.quantity + 1 };
            } else {
              toast.error("Cannot add more, product out of stock!");
            }
          }
          return item;
        })
      );
    } catch (error) {
      toast.error("Failed to check stock, try again.");
      console.error(error);
    }
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
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    province: "",
    country: "Nepal", // default to Nepal or let user select
    email: "", // email can stay for OTP or contact
  });

  // OTP states
  const [otpSent, setOtpSent] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);

  const [sendingOtp, setSendingOtp] = useState(false);

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

    const token = localStorage.getItem("token");

    try {
      // 🔍 Check real-time stock
      const stockCheck = await Promise.all(
        selectedProducts.map(async (item) => {
          const res = await api.get(`/products/${item._id}`);
          const stock = res.data.stock;
          if (item.quantity > stock) {
            return {
              name: item.name,
              available: stock,
              requested: item.quantity,
            };
          }
          return null; // OK
        })
      );

      const outOfStockItems = stockCheck.filter((item) => item !== null);
      if (outOfStockItems.length > 0) {
        outOfStockItems.forEach((item) => {
          toast.error(
            `${item.name} is out of stock. Available: ${item.available}, Requested: ${item.requested}`
          );
        });
        return; // ❌ Stop if any are invalid
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

      if (paymentMethod === "cod") {
        await api.post(
          "/orders",
          { ...orderData, paymentStatus: "UNPAID" },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Order placed successfully!");
        triggerRefresh();
        setHasOrdered(true); // ✅ prevent further order attempts
  navigate("/myorder"); // ✅ redirect after order
      } else if (paymentMethod === "esewa") {
        const createOrderRes = await api.post(
          "/orders",
          {
            ...orderData,
            paymentMethod: "esewa",
            transactionId,
            paymentStatus: "PENDING",
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        triggerRefresh();
         setHasOrdered(true);
        const userId = localStorage.getItem("userId");

        const response = await api.post("/initiate-payment", {
          amount: total,
          productId: transactionId,
          userId: userId,
        });

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
 // ✅ Initialize selected products

useEffect(() => {
  const fromState = location.state?.selectedProducts;

  if (fromState?.length > 0) {
    setSelectedProducts(
      fromState.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      }))
    );
  } else {
    setSelectedProducts(
      cart.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      }))
    );
  }
}, []); // ✅ Runs only once safely

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
