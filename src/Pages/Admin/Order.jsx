import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../Api/axios";

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/orders/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-gray-400">
            <th className="text-left py-2">Order ID</th>
            <th className="text-left py-2">Customer</th>
            <th className="text-left py-2">Total</th>
            <th className="text-left py-2">Status</th>
            <th className="text-left py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="hover:bg-gray-50">
              <td className="py-2">{order._id}</td>
              <td className="py-2">{order.user?.name}</td>
              <td className="py-2">NRs.{order.totalPrice}</td>
              <td className="py-2">{order.orderStatus}</td>
              <td className="py-2">
                <Link
                  to={`/admin/orders/${order._id}`}
                  className="text-blue-600 underline"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
