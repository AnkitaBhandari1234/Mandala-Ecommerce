import React, { useEffect, useState } from "react";
import api from "../../Api/axios";

const SellerOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
 api.get("/seller/orders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // seller token
      },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="bg-white p-4 rounded mb-4 shadow-sm">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Customer:</strong> {order.user?.name}</p>
          <p><strong>Status:</strong> {order.status}</p>

          <div className="mt-2">
            <p className="font-semibold">Items Sold by You:</p>
            <ul className="list-disc pl-6">
              {order.orderItems
                .filter((item) => item.seller === localStorage.getItem("sellerId"))
                .map((item) => (
                  <li key={item.product._id}>
                    {item.product.name} - Qty: {item.qty} - Rs. {item.price}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SellerOrder;
