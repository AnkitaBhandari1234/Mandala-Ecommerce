import React from "react";

const ShippingForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex flex-col items-center rounded-2xl gap-4 sm:py-10 py-7 w-full bg-[#F9EBD2] font-poppins px-3 shadow-[0px_1px_7px_0px_rgba(0,0,0,0.07)]">
      <h3 className="text-[#414141] text-base font-[500] w-full text-left sm:pl-8 pl-4 ">
        Shipping Address
      </h3>
      <input
        type="email"
        name="email"
        placeholder="Email for Order Confirmation"
        value={formData.email}
        onChange={handleChange}
        className="py-2 px-4 rounded-md border border-[#D5D5D5] bg-[#FFF] text-[#999] font-inter text-xs font-[400] outline-none sm:w-11/12 w-full"
      />
      <div className="flex gap-2 sm:w-11/12 ">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="w-[50%] py-2 px-4 rounded-md border border-[#D5D5D5] bg-[#FFF] text-[#999] font-inter text-xs font-[400] outline-none "
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="w-[50%] py-2 px-4 rounded-md border border-[#D5D5D5] bg-[#FFF] text-[#999] font-inter text-xs font-[400] outline-none "
        />
      </div>
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        className="py-2 px-4 rounded-md border border-[#D5D5D5] bg-[#FFF] text-[#999] font-inter text-xs font-[400] outline-none sm:w-11/12 w-full"
      />
      <input
        type="text"
        name="country"
        placeholder="Country"
        value={formData.country}
        onChange={handleChange}
        className="py-2 px-4 rounded-md border border-[#D5D5D5] bg-[#FFF] text-[#999] font-inter text-xs font-[400] outline-none sm:w-11/12 w-full"
      />
      <input
        type="number"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="py-2 px-4 rounded-md border border-[#D5D5D5] bg-[#FFF] text-[#999] font-inter text-xs font-[400] outline-none sm:w-11/12 w-full"
      />
     <input
  type="text"
  name="city"
  placeholder="City"
  value={formData.city}
  onChange={handleChange}
  className="py-2 px-4 rounded-md ..."
/>
<input
  type="text"
  name="district"
  placeholder="District"
  value={formData.district}
  onChange={handleChange}
  className="py-2 px-4 rounded-md ..."
/>
<input
  type="text"
  name="province"
  placeholder="Province"
  value={formData.province}
  onChange={handleChange}
  className="py-2 px-4 rounded-md ..."
/>
    </div>
  );
};

export default ShippingForm;
