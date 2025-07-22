import React, { useState } from "react";
import { generateUniqueId } from "esewajs";
import api from "../../Api/axios";
import { toast } from "react-toastify";

const EsewaPayment = () => {
  const [amount, setAmount] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    try {
      const response = await api.post("/initiate-payment", {
        amount,
        productId: generateUniqueId(),
      });

      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        toast.error("Failed to initiate eSewa payment");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      toast.error("eSewa payment failed.");
    }
  };

  return (

      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-green-700 text-center">Pay with eSewa</h1>

        <form className="space-y-5" onSubmit={handlePayment}>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Enter Amount (NPR)
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 500"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition duration-200"
          >
            Proceed to eSewa
          </button>
        </form>
      </div>
    
  );
};

export default EsewaPayment;
