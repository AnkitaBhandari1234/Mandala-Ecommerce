import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../../Api/axios'

const AdminSellerRequest = () => {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get('/seller-request', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setRequests(response.data);
    } catch (error) {
      setMessage("Failed to fetch seller requests.");
    }
  };

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.put(`/seller-request/${id}/approve`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage("Request approved.");
      fetchRequests();
    } catch (error) {
      setMessage("Error approving request.");
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.put(`/seller-request/${id}/reject`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage("Request rejected.");
      fetchRequests();
    } catch (error) {
      setMessage("Error rejecting request.");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Pending Seller Requests</h1>
      {message && <p className="mb-3 text-red-600">{message}</p>}
      {requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">User</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Business Name</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="border-t">
                <td className="py-2 px-4">{req.userId.username}</td>
                <td className="py-2 px-4">{req.userId.email}</td>
                <td className="py-2 px-4">{req.details.businessName}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    onClick={() => handleApprove(req._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(req._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminSellerRequest;
