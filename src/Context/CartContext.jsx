import React, { createContext, useState } from "react";
import { toast } from "react-toastify";

// Create context
export const CartContext = createContext();

// Create provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const productId = product._id || product.id;
    const existingItem = cart.find(
      (item) => (item._id || item.id) === productId
    );

    if (existingItem) {
      // Side effect moved outside
      toast.info(`${product.name} quantity increased`, {
        position: "bottom-right",
        autoClose: 2000,
      });

      setCart((prevCart) =>
        prevCart.map((item) =>
          (item._id || item.id) === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      toast.success(`${product.name} added to cart`, {
        position: "bottom-right",
        autoClose: 2000,
      });

      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => (item._id || item.id) !== productId)
    );
  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        (item._id || item.id) === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          (item._id || item.id) === productId
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // for selcting the cart product and proceed to checkout
  // CartContext.js
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelectItem = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const clearSelectedItems = () => setSelectedItems([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        selectedItems,
        toggleSelectItem,
        clearSelectedItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
