// src/pages/MyOrders.jsx

import React, { useEffect, useState } from "react";
import api from "../../Api/axios";
import { toast } from "react-toastify";

const Myorder = () => {
  const [orders, setOrders] = useState([]);

  const fetchMyOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/orders/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching my orders:", err);
      toast.error("Failed to load your orders.");
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <div className="min-h-screen bg-[#fff8e6] p-6">
      <h1 className="text-3xl font-semibold mb-4 text-[#414141] font-poppins text-center ">
        My Orders
      </h1>
      {orders.length === 0 ? (
        <p className="font-poppins">No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={order._id}
            className="bg-[#f9ebd2] w-8/12 flex flex-col gap-1 mx-auto rounded-xl p-4 mb-4 shadow-md font-poppins"
          >
            <h2 className="font-semibold text-[#BB4A20] text-2xl">
              Order Status:{" "}
              <span
                className={`text-lg font-semibold ${
                  order.orderStatus === "Delivered"
                    ? "text-green-600"
                    : order.orderStatus === "Shipped"
                    ? "text-blue-600"
                    : "text-yellow-600"
                }`}
              >
                {order.orderStatus}
              </span>
            </h2>

            <p className="text-sm text-[#555]">
              Total:{" "}
              <span className="font-semibold">NRs. {order.totalPrice}</span>
            </p>
            <p className="text-sm text-[#555]">
              Payment: {order.paymentMethod}
            </p>
            <div className="mt-2">
              {order.orderItems.map((item) => (
                <div
                  key={item.product}
                  className="flex  j gap-3   "
                >
                  <img
                    src={
                      Array.isArray(item.image) && item.image.length > 0
                        ? item.image[0].startsWith("http")
                          ? item.image[0]
                          : `http://localhost:8000/${item.image[0].replace(
                              /^public\//,
                              ""
                            )}`
                        : "" // or a placeholder image URL
                    }
                    alt={item.name || item.subtitle || "product"}
                    className="object-cover w-24 rounded-lg "
                  />
                  <div className="flex flex-col gap-2">
                    <h4 className="text-[#3e2f1c] font-medium">Product Name:<span className=" ml-3">{item.name}</span></h4>
                    <p className="text-sm">Qty: <span className=" ml-2">{item.qty}</span></p>
                    <p className="text-sm">Price:  <span className=" ml-2"> NRs.{item.price}</span></p>
                    <p className="text-sm text-gray-600">
                      Ordered On:{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Myorder;
