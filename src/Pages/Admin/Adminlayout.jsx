import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import Add from "../../assets/Icons/add.svg";
import DashboardImg from '../../assets/Icons/dashboard.png';
import ProductAImg from '../../assets/Icons/producta.svg';
import OrderImg from '../../assets/Icons/carta.svg';
import CustomerImg from '../../assets/Icons/customer.svg';
import LogoutImg from '../../assets/Icons/signout.svg';
import NotificationIcon from '../../assets/Icons/notification.svg';
import ProfileIcon from '../../assets/Icons/profile.svg';
import AddNewProduct from "../Admin/AddNewProduct";

import api from "../../Api/axios";
import { useState } from "react";
const AdminLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  //  Add Product and Save to Backend
 const handleAddProduct = (newProduct) => {
  // This is only for refreshing or displaying a success message
  alert("Product added successfully!");
  // Optional: you could update a product list here if needed
};
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-60 h-screen fixed top-0 left-0 bg-[#FBFDFF] border-r border-[#EFF1F3] flex flex-col items-center px-4 py-6 z-20">
        <h2 className="text-[24px] font-bold text-[#112643] font-poppins mb-6">
          Mandala Mool
        </h2>

      <button
          type="button"
          className="font-poppins text-white text-sm bg-[#1F21FF] rounded-3xl flex items-center gap-2 py-1 px-4 mb-8"
          onClick={() => setIsModalOpen(true)

          }
        >
          <img src={Add} alt="Add" className="w-3 h-3" />
          Add new entity
        </button>

        <nav className="flex flex-col gap-6 text-[#858585] font-poppins text-[14px] w-full">
          <NavLink to="/admin/dashboard" className="flex items-center gap-2 hover:text-[#1F21FF]">
            <img src={DashboardImg} alt="Dashboard" className="w-4 h-4" />
            Dashboard
          </NavLink>
          <NavLink to="/admin/products" className="flex items-center gap-2 hover:text-[#1F21FF]">
            <img src={ProductAImg} alt="Products" className="w-4 h-4" />
            Products
          </NavLink>
          <NavLink to="/admin/orders" className="flex items-center gap-2 hover:text-[#1F21FF]">
            <img src={OrderImg} alt="Orders" className="w-4 h-4" />
            Orders
          </NavLink>
          <NavLink to="/admin/users" className="flex items-center gap-2 hover:text-[#1F21FF]">
            <img src={CustomerImg} alt="Users" className="w-4 h-4" />
            Users
          </NavLink>
          <NavLink to="/" className="flex items-center gap-2 hover:text-red-600 mt-4">
            <img src={LogoutImg} alt="Logout" className="w-4 h-4" />
            Sign Out
          </NavLink>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="ml-60 flex flex-col w-full h-screen">
        {/* Header Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex justify-end items-center px-6 fixed top-0 left-60 right-0 z-10">
          <button className="relative mr-6">
            <img src={NotificationIcon} alt="Notifications" className="w-6 h-6" />
            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
          </button>
          <button>
            <img src={ProfileIcon} alt="Profile" className="w-8 h-8 rounded-full" />
          </button>
        </header>

        {/* Page Content */}
        <main className="mt-16 p-6 overflow-y-auto h-full bg-[#F9F9F9]">
          <Outlet />
        </main>

        <AddNewProduct
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    onAddProduct={handleAddProduct}
  />
      </div>
    </div>
  );
};

export default AdminLayout;
