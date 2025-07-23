import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

 const addToCart = (product) => {
  const productId = product._id || product.id;
  const existingItem = cart.find((item) => (item._id || item.id) === productId);

  if (existingItem) {
    if (existingItem.quantity >= existingItem.stock) {
      toast.warning(`Only ${existingItem.stock} in stock`, {
        position: "bottom-right",
        autoClose: 2000,
      });
      return;
    }

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

    // ⬅️ Ensure we add stock info when first adding the product
    setCart((prevCart) => [
      ...prevCart,
      {
        ...product,
        quantity: 1,
        stock: product.stock, // ⬅️ very important
      },
    ]);
  }
};


  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => (item._id || item.id) !== productId));
  };

const increaseQuantity = (productId) => {
  setCart((prevCart) =>
    prevCart.map((item) => {
      if ((item._id || item.id) === productId) {
        if (item.quantity < item.stock) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          toast.warning(`Cannot exceed stock of ${item.stock}`, {
            position: "bottom-right",
            autoClose: 2000,
          });
        }
      }
      return item;
    })
  );
};

  const clearCart = () => {
  setCart([]);
  localStorage.removeItem("cart");
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

  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelectItem = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };
  const selectAllItems = (items) => {
  const allIds = items.map((item) => item._id || item.id);
  setSelectedItems(allIds);
};

  const clearSelectedItems = () => setSelectedItems([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        setCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        selectedItems,
        toggleSelectItem,
        clearSelectedItems,
        selectAllItems,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
