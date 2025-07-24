import React, { useEffect, useState } from "react";
import api from "../../Api/axios";

const EsewaPayment = ({ amount, transactionId }) => {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  useEffect(() => {
  const id = localStorage.getItem("userId")||sessionStorage.getItem("userId");
  if (!id) {
    alert("Please log in to continue.");
  }
  setUserId(id);
}, []);

  const handlePayment = async (e) => {
    e.preventDefault();

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    if (!userId) {
      alert("User not logged in. Cannot proceed with payment.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/initiate-payment", {
        amount: numericAmount,
      transactionId,
        userId,
      });

      if (response.data.url) {
        window.location.href = response.data.url; // Redirect to eSewa payment
      } else {
        alert("Failed to initiate eSewa payment");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Error initiating payment");
    } finally {
      setLoading(false);
    }
  };
 

  return (
    <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-gray-200 mx-auto mt-10">
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
            readOnly
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2.5 rounded-lg font-semibold text-white transition duration-200 ${
            loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Processing..." : "Proceed to eSewa"}
        </button>
      </form>
    </div>
  );
};

export default EsewaPayment;
