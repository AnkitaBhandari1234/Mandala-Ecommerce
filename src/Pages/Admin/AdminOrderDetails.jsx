import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../Api/axios";

const AdminOrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      const { data } = await api.get(`/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOrder(data);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

 
  if (!order) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>

      <div className="mb-4">
       
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>User:</strong> {order.user?.name} ({order.user?.email})</p>
        <p><strong>Status:</strong> {order.orderStatus}</p>
        <p><strong>Payment:</strong> {order.isPaid ? "Paid " : "Not Paid "}</p>
      </div>
<div className="mb-4">
  <h3 className="font-semibold">Shipping Address:</h3>
  <p>{order.shippingAddress?.fullName}</p>
  <p>{order.shippingAddress?.phone}</p>
  <p>{order.shippingAddress?.address}, {order.shippingAddress?.city}</p>
  <p>{order.shippingAddress?.district}, {order.shippingAddress?.province}</p>
  <p>{order.shippingAddress?.country}</p>
</div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Ordered Items:</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-400">
              
              <th className="text-left py-2">Image</th>
              <th className="text-left py-2">Product</th>
              <th className="text-left py-2">Qty</th>
              <th className="text-left py-2">Price</th>
              <th className="text-left py-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.orderItems.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="py-2">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                </td>
                <td className="py-2">{item.name}</td>
                <td className="py-2">{item.qty}</td>
                <td className="py-2">NRs.{item.price}</td>
                <td className="py-2">NRs.{(item.qty * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 border-t pt-4">
        <h3 className="font-semibold mb-2">Order Summary:</h3>
        <p><strong>Total Price:</strong> NRs.{order.totalPrice}</p>
        <p><strong>Ordered At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
      </div>

      <Link
        to="/admin/orders"
        className="inline-block mt-6 text-blue-600 underline"
      >
        ← Back to Orders
      </Link>
    </div>
  );
};

export default AdminOrderDetails;
