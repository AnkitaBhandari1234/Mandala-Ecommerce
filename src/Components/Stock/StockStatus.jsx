// src/components/StockStatus.js
import React from "react";
import { MdCheckCircle, MdCancel } from "react-icons/md";

const StockStatus = ({ stock, className = "" }) => {
  let content = "";
  let color = "";
  let icon = null;

  if (stock > 5) {
    content = "In Stock";
    color = "text-green-600";
    icon = <MdCheckCircle className="text-green-600 text-lg" />;
  } else if (stock > 0) {
    content = `Limited Stock`;
    color = "text-yellow-600";
    icon = <MdCheckCircle className="text-yellow-600 text-lg" />;
  } else {
    content = "Out of Stock";
    color = "text-red-600";
    icon = <MdCancel className="text-red-600 text-lg" />;
  }

  return (
    <div className={`flex items-center gap-1 font-poppins text-sm font-semibold ${color} ${className}`}>
      {icon}
      {content}
    </div>
  );
};

export default StockStatus;
