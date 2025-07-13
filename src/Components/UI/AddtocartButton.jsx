// src/Components/Common/AddToCartButton.jsx
import React, { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import Cart from '../../assets/cart.svg';


const AddToCartButton = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const handleAddToCart = () => {
    console.log("Add to Cart clicked", product.name);
    addToCart(product);
   
  };

  return (
  
    <button
      onClick={handleAddToCart}
     
      className="bg-[#BA4A20] rounded-lg flex py-2 justify-center gap-4 cursor-pointer text-white font-poppins text-[16px] font-[400]"
    >
      Add to Cart
      <img src={Cart} alt="cart icon" className="w-5" />
    </button>
  );
};

export default AddToCartButton;
