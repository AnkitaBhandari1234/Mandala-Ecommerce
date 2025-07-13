import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
//create context
 const CartContext = createContext();
//create provider component
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);


//   add to cart
  const addToCart = (product) => {
  const alreadyInCart = cart.find((item) => item.id === product.id);

  if (alreadyInCart) {
    // Remove from cart
    setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
    toast.info(`${product.name} removed from cart`, {
      position: "bottom-right",
      autoClose: 2500,
       
    });
    console.log(`Product removed from cart:`, product);
  } else {
    // Add to cart
    setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    toast.success(`${product.name} added to cart`, {
      position: "bottom-right",
      autoClose: 2500,
    });
     console.log(`Product added to cart:`, product);
    
  }
  
};
  
  //remove from cart

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };
   // Increase quantity
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart,increaseQuantity,decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
export { CartContext, CartProvider };
