// BecomeSellerPage.jsx
import React, { useState } from 'react';
import BecomeSellerForm from './BecomeSellerForm';
import { useNavigate } from 'react-router-dom';
import SellerBenefits from './SellerBenefits';

const BecomeSellerPage = () => {
  const [modalMessage, setModalMessage] = useState(null); // null or "accepted" / "rejected"
  const navigate = useNavigate();

  // Callback to receive form submission result from BecomeSellerForm
  const handleSubmitResult = (result) => {
    // result is expected as "accepted" or "rejected"
    setModalMessage(result);

    // Redirect after 2.5 seconds
    setTimeout(() => {
      setModalMessage(null); // hide popup

      if (result === "accepted") {
        navigate('/seller/dashboard');
      } else {
        navigate('/');
      }
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#f7f2eb] flex items-center justify-center px-4 py-10 relative">
      <div className="w-full ">
        {/* Header */}
        <div className="text-center">
        <SellerBenefits/>
          <h1 className="text-3xl font-bold text-[#5c4b3b]">Become a Seller</h1>
          <p className="text-[#7a6a58] mt-2 text-sm">
            Share your unique creations with the world. Fill in the form to apply.
          </p>
        </div>

        {/* Form */}
        <BecomeSellerForm onSubmitResult={handleSubmitResult} />
      </div>

      {/* Modal popup */}
      {modalMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-xs text-center">
            {modalMessage === "accepted" ? (
              <>
                <h2 className="text-green-600 text-xl font-semibold mb-2">Application Accepted!</h2>
                <p>You will be redirected to your seller dashboard shortly.</p>
              </>
            ) : (
              <>
                <h2 className="text-red-600 text-xl font-semibold mb-2">Application Rejected</h2>
                <p>You will be redirected to the homepage shortly.</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BecomeSellerPage;
