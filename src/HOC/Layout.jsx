import React, { useEffect, useState } from "react";
import HeaderNavbar from "../Components/Navigation/HeaderNavbar";
import MainNavbar from "../Components/Navigation/MainNavbar";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";

const Layout = () => {
  return (
    <div className="overflow-clip ">
      <HeaderNavbar/>
<MainNavbar/>
     

      <div className="bg-[#FFF8E6]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
