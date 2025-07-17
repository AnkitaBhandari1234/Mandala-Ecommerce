import React, { createContext, useState, useContext, useEffect } from "react";

// Create UserContext
const UserContext = createContext();

// Provider component to wrap your app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null means no user logged in

  // Load user from localStorage or sessionStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function to update user state
  const login = (userData) => {
    setUser(userData);
  };

  // Logout function to clear user state
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("authToken");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to easily use UserContext
export const useUser = () => useContext(UserContext);
