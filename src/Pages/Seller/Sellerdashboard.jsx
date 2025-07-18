// src/pages/Seller/SellerDashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../../Api/axios";

const Sellerdashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api
      .get("/dashboard", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((res) => setUser(res.data.user))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Welcome, {user?.name}</h2>
      <p className="mt-2">
        You are logged in as: <strong>{user?.role}</strong>
      </p>
    </div>
  );
};

export default Sellerdashboard;
