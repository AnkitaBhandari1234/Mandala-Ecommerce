import React from "react";
import Filter from "../Components/Pagecomponents/Filter/Filter";
import Sort from "../Components/Pagecomponents/Filter/Sort";
import produts1_img from "../assets/Product/evildreamcatcher.png";
import produts2_img from "../assets/Product/owldreamcatcher.png";
import produts3_img from "../assets/Product/multidreamcatcher.png";
import { IoIosStar } from "react-icons/io";
import Cart from '../assets/cart.svg';
const Shopall = () => {
  const product = [
    {
      image: produts1_img,
      rating: "(4.8)",
      price: "Nrs. 4,500",
      name: "Evil eye Dream Catcher",
    },
    {
      image: produts2_img,
      rating: "(4.8)",
      price: "Nrs. 4,500",
      name: "Owl Design Dream Catcher",
    },
    {
      image: produts3_img,
      rating: "(4.8)",
      price: "Nrs. 4,500",
      name: "Multicolor Dream Catcher",
    },
    {
      image: produts1_img,
      rating: "(4.8)",
      price: "Nrs. 4,500",
      name: "Evil eye Dream Catcher",
    },
  ];
  return (
    <div className="bg-[#FFF8E6] ">
      <div className=" w-11/12  mx-20 py-20 flex flex-row gap-10 ">
      {/* filter */}
      <div className="w-fit ">

        <Filter />
      </div>
      {/* sorting & products */}
        <div className="w-9/12 flex flex-col items-end gap-7  ">
          <Sort />
          {/* for products images */}
          <div className="border-t-[1.5px] border-[#F0E6D1] py-7">
            <div className="  grid grid-cols-3 gap-6   ">
              {product.map((val, i) => {
                return (
                  <div className="bg-white w-[294px] h-[400px] rounded-2xl shadow-md">
                    <div className="w-[294px] h-[260px]">
                      <img src={val.image} alt="" className=" object-cover  w-4/5  h-full mx-auto" />
                    </div>
                    {/* text-content */}
                    <div className="px-3 py-4 flex  flex-col gap-2">
                    <div className="flex justify-between ">
                      <p className="flex items-center text-[#999] font-poppins text-[12px] font-[400] trackinh-[-0.12px]">
                        <span className="flex ">
                          <IoIosStar className="text-yellow-300" />
                          <IoIosStar className="text-yellow-300" />
                          <IoIosStar className="text-yellow-300" />
                          <IoIosStar className="text-yellow-300" />
                          <IoIosStar className="text-yellow-300" />
                          
                        </span>
                        {val.rating}

                      </p>
                      <span className="text-[#6B7280] font-poppins text-[14px] font-medium">{val.price}</span>
                    </div>
                      <h4 className="text-[#414141] font-poppins text-[14px] font-semibold">{val.name}</h4>
                      <div className="bg-[#BA4A20] rounded-lg flex  py-2 justify-center gap-3 ">
                        <button className="text-[#fff] font-poppins text-[16px] font-[500] ">Add to Cart</button>
                        <img src={Cart} alt=""/>

                        </div>
                  </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shopall;
