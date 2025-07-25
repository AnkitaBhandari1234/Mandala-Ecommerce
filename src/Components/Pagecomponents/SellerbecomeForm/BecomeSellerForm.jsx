import React, { useState } from 'react';
import api from '../../../Api/axios';

const BecomeSellerForm = ({ onSubmitResult }) => {
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const details = { businessName, email, description, category };
      const res= await api.post('/seller-request', { details }, {
        headers: { Authorization: `Bearer ${token}` }
      });
        // Assuming your backend sends back a status in res.data.status
    // Like { status: 'accepted' } or { status: 'rejected' }
    const status = res.data.status || 'accepted'; // fallback to accepted or use your logic
    
    onSubmitResult(status);  // <---- HERE you notify parent
      setMessage(' Seller request sent successfully. Please wait for approval.');
      setBusinessName('');
      setEmail('');
      setDescription('');
      setCategory('');
    } catch (error) {
      setMessage(error.response?.data?.message || ' Error submitting request');
    }
  };

  // for displaying pop up if form is rejected or accepted


  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white w-7/12 mx-auto p-8 rounded-xl shadow-md border border-[#e5ddd3] space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-[#5c4a38] mb-1">
          Business Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          required
          placeholder="e.g. Mandala Mool"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#c6a77d]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#5c4a38] mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#c6a77d]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#5c4a38] mb-1">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
          placeholder="Tell us about your shop or products..."
          className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-[#c6a77d]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#5c4a38] mb-1">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#c6a77d]"
        >
          <option value="">Select a category</option>
          <option value="decor">Decor</option>
          <option value="wellness">Wellness</option>
          <option value="jewelry">Jewelry</option>
          <option value="textile">Textile</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-[#BA4A20]  text-white font-medium py-3 rounded-md "
      >
        Submit Request
      </button>

      {message && (
        <p className="text-sm text-center text-green-700 mt-2">{message}</p>
      )}
    </form>
  );
};

export default BecomeSellerForm;
