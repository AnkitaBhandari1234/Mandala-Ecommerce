import React from 'react';
import { Link } from 'react-router-dom';

const EsewaFailure = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50">
      <h1 className="text-3xl font-bold text-red-700">Payment Failed ❌</h1>
      <p className="mt-3 text-lg">Please try again or use another payment method.</p>
      <Link to="/checkout" className="mt-6 px-4 py-2 bg-red-600 text-white rounded-full">
        Try Again
      </Link>
    </div>
  );
};

export default EsewaFailure;
