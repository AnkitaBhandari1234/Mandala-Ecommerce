// src/pages/Seller/SellerLayout.jsx
import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Add from "../../assets/Icons/add.svg";
import DashboardImg from "../../assets/Icons/dashboard.png";
import ProductImg from "../../assets/Icons/producta.svg";
import LogoutImg from "../../assets/Icons/signout.svg";
import NotificationIcon from "../../assets/Icons/notification.svg";
import ProfileIcon from "../../assets/Icons/profile.svg";
import AddNewProduct from "../Admin/AddNewProduct"; // seller version

const Sellerlayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex">
      <aside className="w-60 h-screen fixed top-0 left-0 bg-white border-r px-4 py-6 z-20">
        <h2 className="text-xl font-bold text-[#112643] mb-6">Seller Panel</h2>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1F21FF] text-white text-sm px-4 py-1 rounded-3xl mb-8 flex items-center gap-2"
        >
          <img src={Add} alt="Add" className="w-3 h-3" />
          Add Product
        </button>

        <nav className="flex flex-col gap-6 text-gray-600 text-sm">
          <NavLink to="/seller/dashboard" className="flex items-center gap-2 hover:text-[#1F21FF]">
            <img src={DashboardImg} alt="Dashboard" className="w-4 h-4" />
            Dashboard
          </NavLink>
          <NavLink to="/seller/products" className="flex items-center gap-2 hover:text-[#1F21FF]">
            <img src={ProductImg} alt="Products" className="w-4 h-4" />
            My Products
          </NavLink>
          <NavLink to="/" className="flex items-center gap-2 hover:text-red-600 mt-4">
            <img src={LogoutImg} alt="Logout" className="w-4 h-4" />
            Logout
          </NavLink>
        </nav>
      </aside>

      <div className="ml-60 flex flex-col w-full h-screen">
        <header className="h-16 bg-white border-b flex justify-end items-center px-6 fixed top-0 left-60 right-0 z-10">
          <img src={NotificationIcon} className="w-6 h-6 mr-6" />
          <img src={ProfileIcon} className="w-8 h-8 rounded-full" />
        </header>

        <main className="mt-16 p-6 overflow-y-auto h-full bg-gray-50">
          <Outlet />
        </main>

        <AddNewProduct
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Sellerlayout;
