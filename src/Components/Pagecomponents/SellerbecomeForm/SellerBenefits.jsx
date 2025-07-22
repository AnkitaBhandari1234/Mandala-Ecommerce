import React from "react";

const benefitsData = [
  {
    title: "Easy Product Listing",
    description:
      "Upload your products quickly with simple forms and start selling fast.",
    features: [
      "Simple form to add product details",
      "Upload images easily",
     
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
     
    ],
  },
];

const SellerBenefits = () => {
  return (
    <div className="mx-auto px-[30px] py-14">
      <h2 className="text-3xl font-semibold text-center mb-10 text-[#BA4A20] font-poppins capitalize tracking-wide">
        Benefits for Sellers
      </h2>
      <div className="flex justify-between gap-8 flex-wrap">
        {benefitsData.map(({ title, description, features }, index) => (
          <div
            key={index}
            className="flex flex-col bg-white rounded-xl shadow-md p-6 text-center"
            style={{
              flexBasis: "30%",
              minWidth: "280px",
              flexGrow: 1,
            }}
          >
            <h3 className="text-xl font-medium mb-3 text-[#414141] font-poppins">
              {title}
            </h3>
            <p className="text-gray-700 mb-5 font-poppins">{description}</p>
            <ul className="list-disc list-inside text-gray-700 text-left space-y-2 px-2 font-poppins">
              {features.map((feature, i) => (
                <li key={i} className="text-[14px]">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerBenefits;
