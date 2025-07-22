// Context/WishlistContext.js
import { createContext, useState, useEffect } from "react";
import { useUser } from "./UserContext";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useUser();

  // Use user ID or email as key, fallback to 'guest' for not logged in
  const storageKey = user ? `wishlist_${user._id || user.email}` : "wishlist_guest";

  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem(storageKey);
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      return [];
    }
  });

  // When user changes (login/logout), load wishlist from localStorage for that user
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem(storageKey);
      setWishlist(savedWishlist ? JSON.parse(savedWishlist) : []);
    } catch (error) {
      setWishlist([]);
    }
  }, [storageKey]);

  // Sync wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(wishlist));
    } catch (error) {
      // handle error, e.g., quota exceeded
    }
  }, [wishlist, storageKey]);

  // Clear wishlist and localStorage for current user when user logs out
  useEffect(() => {
    if (!user) {
      setWishlist([]);
      localStorage.removeItem(storageKey);
    }
  }, [user, storageKey]);

  const addToWishlist = (product) => {
    if (!wishlist.find((item) => item._id === product._id)) {
      setWishlist((prev) => [...prev, product]);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item._id !== productId));
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem(storageKey);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
