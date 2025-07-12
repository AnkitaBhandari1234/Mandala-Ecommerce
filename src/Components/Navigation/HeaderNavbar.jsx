import React, { useEffect, useState } from "react";
// import { IoPersonCircleOutline } from "react-icons/io5";

import { GoHeart } from "react-icons/go";

import { BsCart2 } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import Profile from '../../assets/Icons/profile.svg';
import wishlist from '../../assets/Icons/wish.svg';
import Cart from '../../assets/Icons/shoppingcart.svg';



const HeaderNavbar = () => {
      // for sticky mainnavbar
  const [sticky,setsticky]=useState(false);
  useEffect(()=>{
     const onscroll=()=>{
  
       if(window.scrollY>50){
         setsticky(true);
       }
       else{
         setsticky(false);
       }
     };
     window.addEventListener('scroll',onscroll);
     return ()=> window.removeEventListener('scroll',onscroll);
  },[])
  

  return (
    <div className={` grid grid-cols-9 items-center w-full px-10 py-6 ${sticky?'fixed top-0 bg-white z-10 border-b-[0.5px] border-[#BA4A20]':'relative'}`}>
      {/*  logo image */}
      <div className="text-3xl col-span-2 font-playfair tracking-tight font-bold cursor-pointer px-12 w-fit   ">
        
        <Link to='/'>
        <p className="text-[#4E342E] font-[700] bg-red ">
          Mandala<span className=" text-[#F9A825] font-light ml-1">Mool</span>
        </p>
        </Link>
        
        
      </div>

      {/*search bar  */}
      <div className="col-span-5  flex  flex-row-reverse  pl-14   ">
        <div className="w-full  relative  ">
          <input
            type="text"
            placeholder="Search"
            className=" w-full px-3 py-2 rounded-md outline-none border border-[#D1D1D1] placeholder:text-[#BB4A20] text-[16px] font-[400] font-inter focus:text-[#BB4A20]  "
          ></input>
          <div className="absolute top-1/2 -translate-y-1/2 right-0  text-2xl text-white h-full px-2 py-2 rounded-r-md  bg-[#BB4A20] cursor-pointer placeholder:font-poppins  ">
            <IoSearchOutline className="   " />
          </div>
        </div>
      </div>

      {/* icons cart,wishlist,login */}
      <div className=" col-span-2 flex gap-7   text-[#BA4A20] items-center justify-center text-2xl   ">
        <NavLink to='/login'>

        <img src={Profile} alt="" className="w-7 cursor-pointer"/>
        </NavLink>
        <NavLink to='/cart'>

        <img src={Cart} alt="" className="w-7 cursor-pointer"/>
        </NavLink>
        <img src={ wishlist} alt="" className="w-7 cursor-pointer"/>
      </div>
    </div>
  );
};

export default HeaderNavbar;
