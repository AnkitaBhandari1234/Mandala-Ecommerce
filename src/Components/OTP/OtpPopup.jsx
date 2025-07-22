import React, { useState } from "react";
import api from "../../Api/axios";

const OtpPopup = ({ email, onVerified, onClose }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const verifyOtp = async () => {
    if (!otp) {
      setError("Please enter OTP");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await api.post("/otp/verify", { email, otp });
      if (response.data.success) {
        onVerified();
      }
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-3">Enter OTP</h2>
        <p className="mb-3 text-sm">
          OTP sent to <b>{email}</b>
        </p>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          className="w-full border px-3 py-2 mb-2 rounded"
          placeholder="Enter 6-digit OTP"
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={verifyOtp}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpPopup;
