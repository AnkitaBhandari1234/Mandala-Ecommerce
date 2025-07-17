import React from "react";

const Badge = ({ name }) => {
   const bgColors = {
    "Best Seller": "#A13C3C",    
    "Crafted": "#D9A441",        
    "New": "#B9D5B0",            
    "Eco Friendly": "#D9A441",   
   
  };
  const backgroundColor = bgColors[name] || "#A13C3C";
  return (
    <div className="w-full absolute top-3  left-0 text-white sm:text-[12px] tracking-[0.5px] hover:border-none font-playfair font-[600]     ">
      <div className="w-fit bg-[#A13C3C] sm:h-[20px] h-[27px] relative  pt-[2px] sm:pr-3 pr-4 pl-1.5   " style={{ backgroundColor }}>
        {name}
        <span className=" w-0 h-0   sm:border-t-[10px] border-t-[14px] sm:border-b-[11px] border-b-[14px]  sm:border-l-[6px] border-l-[9px] border-t-transparent border-b-transparent  transform rotate-180 absolute top-0 bottom-0 right-0 overflow-clip border-white  " ></span>
      </div>
    </div>
  );
};

export default Badge;
