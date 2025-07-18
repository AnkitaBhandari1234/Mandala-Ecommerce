import React from 'react';
import BecomeSellerForm from './BecomeSellerForm';

const BecomeSellerPage = () => {
  return (
    <div className="min-h-screen bg-[#f7f2eb] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#5c4b3b]">Become a Seller</h1>
          <p className="text-[#7a6a58] mt-2 text-sm">
            Share your unique creations with the world. Fill in the form to apply.
          </p>
        </div>

        {/* Form (no extra card wrap) */}
        <BecomeSellerForm />
      </div>
    </div>
  );
};

export default BecomeSellerPage;
