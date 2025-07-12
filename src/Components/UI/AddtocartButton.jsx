// src/Components/Common/AddToCartButton.jsx
import React, { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import Cart from '../../assets/cart.svg';

const AddToCartButton = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div
      className="bg-[#BA4A20] rounded-lg flex py-2 justify-center gap-4 cursor-pointer"
      onClick={() => addToCart(product)}
    >
      <button className="text-white font-poppins text-[16px] font-[400]">
        Add to Cart
      </button>
      <img src={Cart} alt="" className="w-5" />
    </div>
  );
};

export default AddToCartButton;
