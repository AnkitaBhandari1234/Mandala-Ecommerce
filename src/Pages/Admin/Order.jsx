import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../Api/axios";

const ORDER_STATUSES = [
  "Pending",
  "Shipped",
  "Delivered",
  
];

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

  // Update status handler
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // Call backend to update order status
      await api.patch(
        `/orders/${orderId}/status`,
        { orderStatus: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update local orders state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Failed to update order status:", error);
      alert("Failed to update status. Please try again.");
    }

  };
  // 🗑️ Handle delete order
    const handleDelete = async (orderId) => {
      const confirm = window.confirm("Are you sure you want to delete this order?");
      if (!confirm) return;
  
      try {
        await api.delete(`/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        // Remove from UI
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      } catch (error) {
        console.error("Failed to delete order:", error);
        alert("Failed to delete the order. Please try again.");
      }
    };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>

      <table className="w-full border-collapse">
        <thead className="">
          <tr className="border-b border-gray-400 ">
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
              <td className="py-2">
                <select
                  value={order.orderStatus}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="border border-gray-300 rounded-full px-2 py-1"
                >
                  {ORDER_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
              <td className="py-2">
                <Link
                  to={`/admin/orders/${order._id}`}
                  className="text-blue-600 underline"
                >
                  View
                </Link>
                 <button
                  onClick={() =>handleDelete(order._id)}
                  className="text-red-600 underline"
                >
                  Delete
                </button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
