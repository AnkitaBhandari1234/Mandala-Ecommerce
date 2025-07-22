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
import Shopall from "./Pages/Shopall.jsx";

import ScrollToTop from "./Components/ScrollToTop.jsx";
import Checkout from "./Components/Pagecomponents/Cart/Checkout.jsx";

import Confirmation from "./Components/Pagecomponents/ConfirmationPage/Confirmation.jsx";

import User from "./Pages/Admin/User.jsx";
import Order from "./Pages/Admin/Order.jsx";

import AdminLayout from "./Pages/Admin/Adminlayout.jsx";
import Dashboard from "./Pages/Admin/Dashboard.jsx";
import Adminproduct from "./Pages/Admin/Adminproduct.jsx";
import ShopAll from "./Pages/Shopall.jsx";
import Wishlist from "./Pages/Wishlist.jsx";
import AdminOrderDetails from "./Pages/Admin/AdminOrderDetails.jsx";
import Myorder from "./Components/Myorder/Myorder.jsx";

import Sellerlayout from "./Pages/Seller/Sellerlayout.jsx";
import Sellerdashboard from "./Pages/Seller/Sellerdashboard.jsx";
import SellerProduct from "./Pages/Seller/SellerProduct.jsx";
import BecomeSellerPage from "./Components/Pagecomponents/SellerbecomeForm/BecomeSellerPage.jsx";

import AdminSellerRequest from "./Pages/Admin/AdminSellerRequest.jsx";
import SearchResultPage from "./Pages/SearchResultPage.jsx";
import EsewaSuccess from "./Components/Esewa/EsewaSuccess.jsx";
import EsewaFailure from "./Components/Esewa/EsewaFailure.jsx";

const App = () => {
  return (
    <div>
      <ScrollToTop />
      <Routes>
        {/* Admin Panel */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Adminproduct />} />
          <Route path="/admin/seller-requests" element={<AdminSellerRequest />} />
          <Route path="orders" element={<Order />} />
          <Route path="orders/:orderId" element={<AdminOrderDetails />} />
          <Route path="users" element={<User />} />
        </Route>


        {/* seller routes */}
        <Route path="/seller" element={<Sellerlayout/>}>
  <Route path="dashboard" element={<Sellerdashboard/>} />
  <Route path="products" element={<SellerProduct/>} />
</Route>


        {/* public route */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop_all" element={<Shopall />} />
          {/* for filtering by category in navbar */}
          <Route path="/:category" element={<ShopAll />} />
          <Route path="/product/:id" element={<Productdetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<SearchResultPage/>}/>
          
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orderconfirmation" element={<Confirmation />} />
          <Route path="/myorder" element={<Myorder/>} />
          <Route path="/become-seller" element={<BecomeSellerPage/>} />
          <Route path="/esewa/success" element={<EsewaSuccess />} />
<Route path="/esewa/failure" element={<EsewaFailure />} />
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default App;
