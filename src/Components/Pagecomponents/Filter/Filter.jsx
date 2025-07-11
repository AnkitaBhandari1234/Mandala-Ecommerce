import React, { useState } from "react";
import Arrow from "../../../assets/arrowcolor.svg";

const Filter = () => {
  const category = [
    {
      title: "Decor",
      type: "checkbox",
      subcategory: [
        {
          name: "Wall Hanging",
        },
        {
          name: "Lamps & Lanterns",
        },
        {
          name: "Cushions & Covers",
        },
      ],
    },
    {
      title: "Textiles",
      type: "checkbox",
      subcategory: [
        {
          name: "Shawls & Scarves",
        },
        {
          name: "Cushion & Table Covers",
        },
        {
          name: "Bedding & Throws",
        },
      ],
    },
    {
      title: "Jewelry",
      type: "checkbox",
      subcategory: [
        {
          name: "Necklaces",
        },
        {
          name: "Earrings",
        },
        {
          name: "Bracelets & Bangles",
        },
      ],
    },
    {
      title: "Ceramics",
      type: "checkbox",
      subcategory: [
        {
          name: "Mugs & Cups",
        },
        {
          name: "Serving Bowls",
        },
        {
          name: "Decorative Vases",
        },
      ],
    },
    {
      title: "Artifacts",
      type: "checkbox",
      subcategory: [
        {
          name: "Statues & Sculptures",
        },
        {
          name: "Masks",
        },
        {
          name: "Prayer Wheels & Bells",
        },
      ],
    },
    {
      title: "Wellness",
      type: "checkbox",
      subcategory: [
        {
          name: "Incense & Burners",
        },
        {
          name: "Herbal Products",
        },
      ],
    },
    {
      title: "Artisan",
      type: "checkbox",
      subcategory: [
        {
          name: "Project Sarangi",
        },
      ],
    },
  ];
  const [openCategories, setOpenCategories] = useState({});
  // toggle that specific category
  const toggleCategory = (index) => {
    setOpenCategories((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  return (
    <div className="bg-[#FCF2DD] w-[240px] rounded-lg shadow-[0px_2px_2px_0px_rgba(0,0,0,0.08)] py-2   ">
      <h1 className="text-[#757575] font-poppins text-[16px] font-[400] py-2 px-3  ">
        Filters
      </h1>
      {/* category */}
      <div className="">
        <h2 className="text-[#757575] font-poppins text-[17px] font-medium my-3 flex justify-between mx-3 ">
          Category
          
        </h2>
        <div>
          {category.map((cat, index) => (
            <div key={index} className="mb-4 flex flex-col gap-2">
              <div className="flex justify-between mx-3">
                <h2 className="font-medium text-[15px] font-poppins text-[#BA4A20]  ">
                  {cat.title}
                </h2>
                <img
                  src={Arrow}
                  alt=""
                  onClick={() => toggleCategory(index)}
                  className="cursor-pointer"
                />
              </div>
              {openCategories[index] && (
                <div className="ml-0.5 flex flex-col gap-1 border-t border-[#F4E9CA] pt-2">
                  {cat.subcategory.map((sub, subIndex) => (
                    <label
                      key={subIndex}
                      className=" text-[#757575] font-poppins text-[13px] font-medium flex items-center px-3 "
                    >
                      <input
                        type={cat.type}
                        name={cat.title}
                        value={sub.name}
                        className="mr-1.5 w-4 h-4    rounded-[2px] bg-[#fff] accent-[#A0522D] border border-[#C4C4C4]  shadow-[0px_3px_2px_0px_rgba(0,0,0,0.08)]  "
                      />
                      {sub.name}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
