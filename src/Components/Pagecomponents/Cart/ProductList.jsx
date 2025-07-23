import React from "react";
import { IoIosAdd, IoIosStar } from "react-icons/io";
import { GrFormSubtract } from "react-icons/gr";
import Delete from "../../../assets/Icons/delete.svg";

const ProductList = ({
  selectedProducts,
  increaseQty,
  decreaseQty,
  removeProduct,
}) => {
  return (
    <div className="flex flex-col sm:w-[650px] w-fit mt-5">
      {selectedProducts.length === 0 ? (
        <p className="text-center text-[#9B4E2B] py-10">No products selected.</p>
      ) : (
        selectedProducts.map((item, i) => (
          <div
            key={i}
            className="flex gap-5 bg-[#FCF2DD] items-center sm:py-5 py-3 sm:px-5 px-3 border-b-[1.5px] border-[#FFE9C1] shadow-[0px_1px_7px_0px_rgba(0,0,0,0.07)]"
          >
            <div className="sm:w-[170px] sm:h-[125px] bg-white">
                      <img
  src={
    Array.isArray(item.image) && item.image.length > 0
      ? item.image[0].startsWith("http")
        ? item.image[0]
        : `http://localhost:8000/${item.image[0].replace(/^public\//, "")}`
      : "" // or a placeholder image URL
  }
  alt={item.name || item.subtitle || "product"}
  className="object-cover sm:w-20 mx-auto"
/>
            </div>
            <div className="flex flex-col sm:gap-3 gap-1 sm:pr-8 w-full">
              <div className="flex flex-row justify-between">
                <div>
                  <h4 className="text-[#3E2F1C] font-poppins sm:text-[15px] text-[10px] font-[400] sm:w-4/6 w-5/6 sm:leading-5 leading-3">
                    {item.subtitle}
                  </h4>
                  <span className="flex items-center text-[#999] font-poppins text-[11px] font-[400] tracking-[-0.12px]">
                    {[...Array(5)].map((_, i) => (
                      <IoIosStar key={i} className="text-yellow-400 text-base" />
                    ))}
                    {item.rating}
                  </span>
                </div>
                <img
                  src={Delete}
                  alt="delete"
                  className="h-4 cursor-pointer"
                  onClick={() => removeProduct(item._id)}
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#BA4A20] font-poppins sm:text-[15px] text-xs font-[500]">
                  NRs.{item.price}
                </span>
                <button className="bg-[#D9A441] font-[500] rounded-3xl text-white sm:px-3 px-1.5 sm:py-1.5 py-1 flex items-center justify-center gap-4">
                  <GrFormSubtract
                    className="text-xl"
                    onClick={() => decreaseQty(item._id)}
                  />
                  {item.quantity}
                  <IoIosAdd
                    className="text-xl"
                    onClick={() => increaseQty(item._id)}
                  />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
