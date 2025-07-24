
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { base64Decode } from "esewajs";
import api from "../../Api/axios";

const EsewaSuccess = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("data");

    if (!token) {
      setIsLoading(false);
      setIsSuccess(false);
      return;
    }

    const decoded = base64Decode(token);

    const verifyPaymentAndUpdateStatus = async () => {
      try {
        const response = await api.post("/payment-status", {
          transactionId: decoded.transaction_uuid,
        });

        if (response.status === 200) {
          setIsSuccess(true);
        } else {
          setIsSuccess(false);
        }
      } catch (error) {
        console.error("Error confirming payment:", error);
        setIsSuccess(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyPaymentAndUpdateStatus();
  }, [location.search]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-6">
          <div className="w-12 h-12 border-4 border-green-600 border-dashed rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 text-lg font-medium">Confirming your payment...</p>
        </div>
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md text-center space-y-6 border border-red-300">
          <h1 className="text-3xl font-bold text-red-600">Payment Error</h1>
          <p className="text-gray-600 text-base">
            Oops! Something went wrong while confirming your payment. We’ll resolve it soon.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-200"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md text-center space-y-6 border border-green-300">
        <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
        <p className="text-gray-700 text-base">
          Thank you for your payment. Your transaction has been successfully processed.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-200"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default EsewaSuccess;
