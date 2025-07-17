import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Myprofile = ({ user }) => {
  const [open, setOpen] = useState(false);

  // Generate avatar URL using UI Avatars
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user?.name || "User"
  )}&background=random&rounded=true`;

  const handleLogout = () => {
   localStorage.removeItem("authToken");
sessionStorage.removeItem("authToken");
localStorage.removeItem("user");
sessionStorage.removeItem("user");
window.location.href = "/login";
  };

  return (
    <div className="relative">
      <div onClick={() => setOpen(!open)} className="cursor-pointer">
        <img
          src={avatarUrl}
          alt="avatar"
          className="w-8 h-8 rounded-full border border-gray-300"
        />
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-50 border">
          <Link
            to="/myorder"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            My Orders
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Myprofile;
