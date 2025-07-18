import React, { useContext, useEffect, useState } from "react";

import { IoSearchOutline } from "react-icons/io5";

import { Link, NavLink } from "react-router-dom";
import Profile from "../../assets/Icons/profile.svg";
import Wishlist from "../../assets/Icons/wish.svg";
import Cart from "../../assets/Icons/shoppingcart.svg";
import { CartContext } from "../../Context/CartContext";
import { useUser } from "../../Context/UserContext"; // adjust path if needed
import { useNavigate } from "react-router-dom";
import { WishlistContext } from "../../Context/WishlistContext";
import Myprofile from "../UI/Myprofile";

const HeaderNavbar = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  // for sticky mainnavbar
  const [sticky, setsticky] = useState(false);
  useEffect(() => {
    const onscroll = () => {
      if (window.scrollY > 50) {
        setsticky(true);
      } else {
        setsticky(false);
      }
    };
    window.addEventListener("scroll", onscroll);
    return () => window.removeEventListener("scroll", onscroll);
  }, []);
  //for cart notifications
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // for wishlist notification
  const { wishlist } = useContext(WishlistContext);

  return (
    <div
      className={` grid sm:grid-cols-9 grid-cols-2   items-center w-full sm:px-10  sm:py-6 py-3 ${
        sticky
          ? "fixed top-0 bg-white z-10 border-b-[0.5px] border-[#BA4A20]"
          : "relative"
      }`}
    >
      {/*  logo image */}
      <div className="sm:text-3xl text-2xl  sm:col-span-2 col-span-1 font-playfair tracking-tight font-bold cursor-pointer sm:px-12 px-6 w-fit   ">
        <Link to="/">
          <p className="text-[#4E342E] font-[700] bg-red ">
            Mandala<span className=" text-[#F9A825] font-light ml-1">Mool</span>
          </p>
        </Link>
      </div>

      {/*search bar  */}
      <div className="col-span-5  sm:flex hidden  flex-row-reverse pl-14   ">
        <div className="w-full  relative  ">
          <input
            type="text"
            placeholder="Search"
            className=" w-full px-3 py-2 rounded-md outline-none border border-[#D1D1D1]  text-[16px] font-[400] font-inter focus:ring-1 focus:ring-[#BB4A20] "
          ></input>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 text-2xl text-white h-full px-2 py-2 rounded-r-md  bg-[#BB4A20] cursor-pointer placeholder:font-poppins  ">
            <IoSearchOutline className="   " />
          </div>
        </div>
      </div>

      {/* icons cart,wishlist,login */}
      <div className=" sm:col-span-2 col-span-1 flex sm:gap-5 gap-4  text-[#BA4A20] items-center sm:justify-center justify-end px-6 text-2xl   ">
        {user && user.name ? (
          <Myprofile user={user} />
        ) : (
          <NavLink to="/signup">
            <img
              src={Profile}
              alt="Profile"
              className="sm:w-7 w-5 cursor-pointer"
            />
          </NavLink>
        )}
        {/* //for cart */}

        {user ? (
          <NavLink to="/cart" className="relative">
            <img src={Cart} alt="Cart" className="sm:w-7 w-5 cursor-pointer" />
            <span className="font-poppins absolute -top-1 -right-2 bg-red-600 text-white text-xs font-[500] w-4 h-4 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          </NavLink>
        ) : (
          <div
            className="relative cursor-pointer"
            onClick={() => {
              alert("Please login to access your cart.");
              navigate("/signup");
            }}
          >
            <img src={Cart} alt="Cart" className="sm:w-7 w-5" />
            <span className="font-poppins absolute -top-1 -right-2 bg-red-600 text-white text-xs font-[500] w-4 h-4 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          </div>
        )}
        <NavLink to="/wishlist" className="relative">
          <img
            src={Wishlist}
            alt="Wishlist"
            className="sm:w-7 w-5 cursor-pointer"
          />

          <span className="font-poppins absolute -top-1 -right-2 bg-red-600 text-white text-xs font-[500] w-4 h-4 flex items-center justify-center rounded-full">
            {wishlist.length}
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default HeaderNavbar;
