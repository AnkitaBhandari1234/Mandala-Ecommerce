import React, { useEffect, useState } from "react";
import api from "../../Api/axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/dashboard");
        setUser(res.data.user);
      } catch (err) {
        setError("Failed to load user data. Please login again.");
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
      }
    };

    fetchUser();
  }, []);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Welcome, {user.email}</h2>
      {user.role === "admin" && <p>You're an admin. You can manage everything.</p>}
      {user.role === "seller" && <p>You can manage your own products.</p>}
    </div>
  );
};

export default Dashboard;
