import React from "react";

import { Route, Routes } from "react-router-dom";
import Layout from "./HOC/Layout";

import Home from "./Pages/Home";
import Productdetails from "./Components/Pagecomponents/ProductDetails/Productdetails";
import Cart from "./Components/Pagecomponents/Cart/Cart.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Shopall from './Pages/Shopall.jsx';

import ScrollToTop from "./Components/ScrollToTop.jsx";
import Checkout from "./Components/Pagecomponents/Cart/Checkout.jsx";
import ProductPage from "./Components/Pagecomponents/ProductDetails/Productpage.jsx";

const App = () => {
  return (
    <div>
     
<ScrollToTop/>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop_all" element={<Shopall/>} />
          <Route path="/:category" element={<ProductPage />} />
          <Route path="/product/:id" element={<Productdetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/checkout" element={<Checkout/>} />
        </Route>
      </Routes>
      
      
    </div>
  );
};

export default App;
