import { useState } from "react";

const Filter = ({ categories = [], selectedSubcategories = [], toggleSubcategory }) => {
  const [openCategories, setOpenCategories] = useState({}); // Track which category panels are open

  const toggleCategoryOpen = (index) => {
    setOpenCategories((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="bg-[#FCF2DD] w-[240px] rounded-lg shadow-[0px_2px_2px_0px_rgba(0,0,0,0.08)] py-2">
      <h1 className="text-[#757575] font-poppins text-[16px] font-[400] py-2 px-3">Filters</h1>

      {categories.length === 0 && (
        <p className="text-[#757575] px-3 text-sm">No categories available</p>
      )}

      {categories.map((cat, idx) => (
        <div key={idx} className="mb-4 flex flex-col gap-2">
          {/* Category Header */}
          <div
            className="flex justify-between mx-3 items-center cursor-pointer"
            onClick={() => toggleCategoryOpen(idx)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && toggleCategoryOpen(idx)}
          >
            <h2 className="font-medium text-[15px] font-poppins text-[#BA4A20]">{cat.category}</h2>
            <svg
              className={`w-4 h-4 transition-transform ${
                openCategories[idx] ? "rotate-180" : "rotate-0"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Subcategories List */}
          {openCategories[idx] && cat.subcategories && (
            <div className="ml-5 flex flex-col gap-2 border-t border-[#F4E9CA] pt-2">
              {cat.subcategories.length === 0 && (
                <p className="text-[#757575] px-3 text-sm">No subcategories</p>
              )}
              {cat.subcategories.map((sub, subIdx) => (
                <label
                  key={subIdx}
                  className="text-[#757575] font-poppins text-[13px] font-medium flex items-center px-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedSubcategories.includes(sub)}
                    onChange={() => toggleSubcategory(sub)}
                    className="mr-2 w-4 h-4 rounded-[2px] bg-white accent-[#A0522D] border border-[#C4C4C4] shadow-[0px_3px_2px_0px_rgba(0,0,0,0.08)]"
                  />
                  {sub}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Filter;
