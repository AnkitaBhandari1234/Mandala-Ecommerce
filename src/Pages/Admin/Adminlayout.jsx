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

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-50  flex flex-col gap-8  fixed h-screen   py-5 items-center bg-[#FBFDFF]  border-r border-[#EFF1F3] px-4">
        <h2 className="text-[28px] font-bold mb-8 text-[#112643] font-poppins text-center">
          Mandala Mool
        </h2>
        <button
          type="submit"
          className="font-poppins text-white text-[15px] font-[400] bg-[#1F21FF] rounded-3xl flex gap-1.5 justify-center  py-1 w-fit px-3.5"
        >
          <img src={Add} alt="" className="w-3" />
          Add new entity
        </button>
        <div className="flex flex-col gap-10  text-[#858585] font-poppins text-[14px] font-[400] mr-7">

        <NavLink to="/admin/dashboard" className='flex items-center gap-1.5 '>
        <img src={DashboardImg} alt="" className="w-4 h-4"/>
        Dashboard</NavLink>
        <NavLink to="/admin/products" className='flex items-center gap-1.5'>
        <img src={ProductAImg} alt=""/>
        Products</NavLink>
        <NavLink to="/admin/orders" className='flex items-center gap-1.5'>
        <img src={OrderImg} alt=""/>
        Orders</NavLink>
        <NavLink to="/admin/users" className='flex items-center gap-1.5'>
        <img src={CustomerImg}/>
        Users</NavLink>
        <NavLink to="/admin/users" className='flex items-center gap-1.5'>
        <img src={LogoutImg}/>
        Sign Out</NavLink>
        </div>
      </aside>

     <div className="ml-50 flex flex-col flex-1 w-full h-screen">
        {/* Header */}
        <header className="flex justify-end items-center h-16 px-6   fixed left-50 right-0 top-0 z-10 w-fit ">
          <button className="relative mr-6">
            <img src={NotificationIcon} alt="Notifications" className="w-6 h-6 cursor-pointer" />
            {/* Optional: notification badge */}
            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
          </button>
          <button>
            <img src={ProfileIcon} alt="Profile" className="w-8 h-8 rounded-full cursor-pointer" />
          </button>
        </header>

        {/* Content */}
        <main className=" overflow-y-auto  ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
