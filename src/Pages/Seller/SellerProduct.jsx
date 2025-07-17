// src/pages/Seller/SellerProducts.jsx
import React, { useEffect, useState } from "react";
import api from "../../Api/axios";
import { toast } from "react-toastify";

const SellerProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchSellerProducts();
  }, []);

  const fetchSellerProducts = async () => {
    try {
      const res = await api.get("/dashboard/seller/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setProducts(res.data);
    } catch (error) {
      toast.error("Failed to load seller products");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Products</h2>
      {/* List seller's products here (same as admin's product list UI) */}
    </div>
  );
};

export default SellerProduct;
