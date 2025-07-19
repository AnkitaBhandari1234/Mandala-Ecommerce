import React from "react";

const benefitsData = [
  {
    title: "Easy Product Listing",
    description: "Upload your products quickly with simple forms and start selling fast.",
    features: [
      "Simple form to add product details",
      "Upload images easily",
      "Manage products anytime",
    ],
  },
  {
    title: "Marketing Help",
    description: "We help promote your products so you get more buyers.",
    features: [
      "Featured listings to get noticed",
      "Social media promotion support",
    ],
  },
  {
    title: "Secure Payments",
    description: "Get paid safely and easily for all your sales.",
    features: [
      "Trusted payment gateways",
      "Fast payout process",
      "Order tracking support",
    ],
  },
];

const SellerBenefits = () => {
  return (
    <div className=" mx-auto px-[30px] py-14">
      <h2 className="text-3xl font-bold text-center mb-10 text-[#5c4b3b]">
        Benefits for Sellers
      </h2>
      <div className="flex justify-between  gap-11">
        {benefitsData.map(({ title, description, features }, index) => (
          <div
            key={index}
            className={`flex flex-col bg-white rounded-xl shadow-lg p-7 text-center transition-transform duration-300 ${
              index === 1
                ? "scale-110 shadow-md z-10"
                : "hover:scale-105 hover:shadow-xl"
            }`}
            style={{
              flexBasis: index === 1 ? "40%" : "28%",
              minWidth: 0,
            }}
          >
            <h3 className="text-2xl font-semibold mb-3 text-[#7a5c44]">{title}</h3>
            <p className="text-gray-700 mb-5">{description}</p>
            <ul className="list-disc list-inside text-gray-700 text-left space-y-2 px-4">
              {features.map((feature, i) => (
                <li key={i} className="text-base">{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerBenefits;
