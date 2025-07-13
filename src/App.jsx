import React from "react";

import { Route, Routes } from "react-router-dom";
import Layout from "./HOC/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./Pages/Home";
import Productdetails from "./Components/Pagecomponents/ProductDetails/Productdetails";
import Cart from "./Components/Pagecomponents/Cart/Cart.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Shopall from './Pages/Shopall.jsx';

import ScrollToTop from "./Components/ScrollToTop.jsx";
import Checkout from "./Components/Pagecomponents/Cart/Checkout.jsx";
import ProductPage from "./Components/Pagecomponents/ProductDetails/Productpage.jsx";
import Confirmation from "./Components/Pagecomponents/ConfirmationPage/Confirmation.jsx";

import User from "./Pages/Admin/User.jsx";
import Order from "./Pages/Admin/Order.jsx";


import AdminLayout from "./Pages/Admin/Adminlayout.jsx";
import Dashboard from "./Pages/Admin/Dashboard.jsx";
import Adminproduct from "./Pages/Admin/Adminproduct.jsx";

const App = () => {
  return (
    <div>
        
     
<ScrollToTop/>
      <Routes>

     {/* Admin Panel */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Adminproduct/>} />
        <Route path="orders" element={<Order />} />
        <Route path="users" element={<User />} />
      </Route>
  {/* public route */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop_all" element={<Shopall/>} />
          <Route path="/:category" element={<ProductPage />} />
          <Route path="/product/:id" element={<Productdetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/orderconfirmation" element={<Confirmation/>} />
        </Route>


       

        
      
      </Routes>
      <ToastContainer position="bottom-right"/>
    
      
    </div>
  );
};

export default App;
