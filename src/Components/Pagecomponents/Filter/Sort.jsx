import React from "react";
import Arrow from "../../../assets/arrowdown.svg";

const Sort = ({onSortChange}) => {
  const handleSort = (e) => {
    onSortChange(e.target.value); 
  };
  return (
    <div className="flex bg-[#FCF2DD] w-[180px]   rounded-lg py-2  shadow-[0px_2px_2px_0px_rgba(0,0,0,0.08)] h-fit ">
      <select className=" bg-inherit text-[15px] text-[#757575]  font-poppins font-[500] pl-2 border-none outline-none cursor-pointer   " onChange={handleSort}>
        <option value="Relevant">Sort by</option>
        <option value="low-high">Sort by: Low to High</option>
        <option value="high-low">Sort by: High to Low</option>
      </select>
    </div>
  );
};

export default Sort;
