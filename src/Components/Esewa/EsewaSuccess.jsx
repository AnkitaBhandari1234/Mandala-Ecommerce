import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { base64Decode } from "esewajs";
import api from '../../Api/axios';

const EsewaSuccess = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("data");
  const decoded = base64Decode(token);

  const verifyPaymentAndUpdateStatus = async () => {
    try {
      const response = await api.post("/payment-status", {
        product_id: decoded.transaction_uuid,
      });

      if (response.status === 200) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Payment verification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyPaymentAndUpdateStatus();
  }, []);

  if (isLoading) return <h2>Verifying payment...</h2>;

  return (
    <div>
      {isSuccess ? (
        <>
          <h1>Payment Successful!</h1>
          <p>Your transaction was completed successfully.</p>
        </>
      ) : (
        <>
          <h1>Payment Failed</h1>
          <p>We couldn't verify your transaction. Please try again later.</p>
        </>
      )}
      <button onClick={() => navigate("/")} className="go-home-button">
        Go to Homepage
      </button>
    </div>
  );
};

export default EsewaSuccess;
