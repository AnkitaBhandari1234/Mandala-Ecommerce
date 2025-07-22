import React, { useContext } from "react";
import { WishlistContext } from "../Context/WishlistContext";
import { CartContext } from "../Context/CartContext";
import { IoIosStar, IoIosAdd } from "react-icons/io";
import { GrFormSubtract } from "react-icons/gr";
import Delete from "../assets/Icons/delete.svg";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";


const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
   const { user } = useUser();
const navigate=useNavigate();
  const total = wishlist.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="bg-[#FFF8E6] min-h-screen sm:py-20 py-10">
      <div className="w-11/12 mx-auto flex flex-col gap-8">
        <h1 className="text-[#3E2F1C] text-2xl font-semibold font-poppins">
          My Wishlist ({wishlist.length} items)
        </h1>

        {wishlist.length === 0 ? (
          <p className="text-[#999] text-lg font-poppins">No items in wishlist.</p>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {wishlist.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-5 bg-[#FCF2DD] items-center sm:py-5 py-3 sm:px-5 px-3  border-b-[1.5px] border-[#FFE9C1] shadow-[0px_1px_7px_0px_rgba(0,0,0,0.07)] rounded-lg"
                >
                  <div className="w-[170px] h-[125px] bg-white flex items-center justify-center">
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="object-contain w-[90px]"
                    />
                  </div>

                  <div className="flex flex-col gap-3  sm:pr-8 w-full ">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-[#3E2F1C] font-poppins sm:text-[16px] text-sm font-[500]">
                          {item.name}
                        </h4>
                        <p className="text-[#858585] sm:text-sm text-[11px]">
                          {item.subtitle}
                        </p>
                        <div className="flex items-center text-[#999] text-sm">
                          <IoIosStar className="text-yellow-400" />
                          <IoIosStar className="text-yellow-400" />
                          <IoIosStar className="text-yellow-400" />
                          <IoIosStar className="text-yellow-400" />
                          <IoIosStar className="text-yellow-400" />
                          {item.rating}
                        </div>
                      </div>

                      <img
                        src={Delete}
                        alt="delete"
                        className="h-4 cursor-pointer"
                        onClick={() => removeFromWishlist(item._id)}
                      />
                    </div>

                    <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-y-2">
                      <span className="text-[#BA4A20] font-poppins text-[15px] font-[600]">
                        NRs.{item.price}
                      </span>
                      <button
                        onClick={() => {
                          if(!user){
                            alert("please log in to add to cart");
                            navigate('/signup');
                          }
                          else{

                            addToCart(item);
                            removeFromWishlist(item._id);
                          }
                        }}
                        className="bg-[#BA4A20] w-fit text-white sm:px-4 px-3 sm:py-2 py-1 rounded-2xl font-poppins sm:text-sm text-xs sm:font-medium font-light hover:bg-[#a4401a]"
                      >
                        Move to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total section */}
            <div className="flex justify-end mt-8">
              <div className="bg-[#F9EBD2] w-[400px] p-6 rounded-2xl shadow-[0px_1px_5px_0px_rgba(0,0,0,0.07)] font-poppins">
                <h3 className="text-[17px] font-[600] text-[#9B4E2B] mb-4">
                  Wishlist Summary
                </h3>
                <div className="flex justify-between text-[#414141] text-[15px] font-[500]">
                  <span>Total Wishlist Value</span>
                  <span>NRs.{total}</span>
                </div>
                <p className="text-[#858585] text-[13px] mt-2">
                  You can move products to cart and proceed to checkout.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
