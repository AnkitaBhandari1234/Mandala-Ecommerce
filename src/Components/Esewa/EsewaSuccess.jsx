import React from 'react';
import { Link } from 'react-router-dom';

const EsewaSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <h1 className="text-3xl font-bold text-green-700">Payment Successful ✅</h1>
      <p className="mt-3 text-lg">Your order has been confirmed via eSewa.</p>
      <Link to="/" className="mt-6 px-4 py-2 bg-green-600 text-white rounded-full">
        Go to Home
      </Link>
    </div>
  );
};

export default EsewaSuccess;
