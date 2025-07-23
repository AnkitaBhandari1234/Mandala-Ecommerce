import React, { useContext, useEffect } from "react";
import Delete from "../../../assets/Icons/delete.svg";
import { IoIosAdd, IoIosStar } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "../../../Context/CartContext.jsx";
import { GrFormSubtract } from "react-icons/gr";
import { useUser } from "../../../Context/UserContext.jsx";

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const {
    cart,
     setCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    selectedItems,
    toggleSelectItem,
    clearSelectedItems,
    selectAllItems,
  } = useContext(CartContext);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    if (!user) {
      alert("Please login to proceed to checkout.");
      navigate("/signup");
      return;
    }

    const selectedProducts = cart.filter(item => selectedItems.includes(item._id));
    if (selectedProducts.length === 0) {
      alert("Please select at least one product to proceed.");
      return;
    }

    navigate("/checkout", { state: { selectedProducts } });
  };

  const handleSelectAllToggle = () => {
    if (selectedItems.length === cart.length) {
      clearSelectedItems();
    } else {
      selectAllItems(cart);
    }
  };
  useEffect(() => {
  const syncCartWithLatestStock = async () => {
     if (cart.length === 0) return;
    const updatedCart = await Promise.all(
      cart.map(async (item) => {
        try {
          const res = await api.get(`/products/${item._id || item.id}`);
          return {
            ...item,
            stock: res.data.stock, // 🔄 overwrite stale stock
             name: res.data.name || item.name,
              subtitle: res.data.subtitle || item.subtitle,
          };
        } catch (error) {
          return item; // fallback if fetch fails
        }
      })
    );

    setCart(updatedCart); // update local state
  };

  syncCartWithLatestStock();
}, []);


  return (
    <div className="bg-[#FFF8E6]">
      <div className="flex sm:flex-row flex-col w-11/12 mx-auto py-9">
        {/* Selected Items */}
        <div className="sm:w-[70%] sm:mx-6 my-8 flex flex-col gap-7">
          <div className="bg-[#FCF2DD] flex flex-row justify-between items-center rounded-lg px-3 py-2.5 shadow">
            <label className="text-[#858585] font-poppins text-[16px] font-[400] uppercase flex items-center gap-3">
              <input
                type="checkbox"
                checked={selectedItems.length === cart.length && cart.length > 0}
                onChange={handleSelectAllToggle}
                className="w-4 h-4 accent-[#A0522D] border border-[#C4C4C4]"
              />
              Select items
            </label>
            <button className="flex text-[#858585] font-poppins text-[15px] font-[400] gap-2">
              <img src={Delete} alt="delete" />
            </button>
          </div>

          <div className="flex flex-col">
            {cart.length === 0 ? (
              <div className="text-center text-[#9B4E2B] font-medium py-10">
                Your cart is empty.
              </div>
            ) : (
              cart.map((val, i) => (
                <div
                  key={i}
                  className="flex sm:gap-5 gap-1 bg-[#FCF2DD] items-center py-5 sm:px-5 px-2 border-b border-[#FFE9C1] shadow"
                >
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(val._id)}
                    onChange={() => toggleSelectItem(val._id)}
                    className="mr-1.5 sm:w-4 sm:h-4 accent-[#A0522D] border border-[#C4C4C4]"
                  />
                  <div className="sm:w-[170px] w-[100px] sm:h-[125px] h-[100px] bg-white">
                    <img
  src={
    Array.isArray(val.image) && val.image.length > 0
      ? val.image[0].startsWith("http")
        ? val.image[0]
        : `http://localhost:8000/${val.image[0].replace(/^public\//, "")}`
      : "" // or a placeholder image URL
  }
  alt={val.name || val.subtitle || "product"}
  className="object-cover sm:w-20 mx-auto"
/>
                  </div>
                  <div className="flex flex-col gap-3 sm:pr-8 w-full">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="text-[#3E2F1C] font-poppins sm:text-[15px] text-xs font-[400]">
                          {val.subtitle}
                        </h4>
                        <span className="flex items-center text-[#999] text-[11px] font-[400]">
                          {[...Array(5)].map((_, idx) => (
                            <IoIosStar key={idx} className="text-yellow-400 text-base" />
                          ))}
                          {val.rating}
                        </span>
                      </div>
                      <img
                        src={Delete}
                        alt="delete"
                        className="h-4 cursor-pointer"
                        onClick={() => removeFromCart(val._id)}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#BA4A20] font-poppins text-[15px] font-[500]">
                        NRs.{val.price}
                      </span>
                      <button className="bg-[#D9A441] font-[500] rounded-3xl text-white px-3 py-1 flex items-center gap-4">
                        <GrFormSubtract
                          className="text-xl"
                          onClick={() => decreaseQuantity(val._id)}
                        />
                        {val.quantity}
                        <IoIosAdd
                          className="text-xl"
                          onClick={() => increaseQuantity(val._id)}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-[#FCF2DD] flex flex-col gap-4 h-fit sm:mt-28 mt-7 rounded-2xl sm:w-[420px] px-6 py-4 font-poppins shadow">
          <h2 className="text-[17px] font-[600] text-[#9B4E2B]">Order Summary</h2>
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between">
              <h4 className="text-[#858585] text-[15px]">Subtotal</h4>
              <span className="text-[#414141] text-[14px] font-[500]">
                NRs.{subtotal}
              </span>
            </div>
            <div className="flex justify-between">
              <h4 className="text-[#858585] text-[15px]">Discount</h4>
              <span className="text-[#414141] text-[14px] font-[500]">NO</span>
            </div>
            <div className="flex justify-between">
              <h4 className="text-[#858585] text-[15px]">Delivery fee</h4>
              <span className="text-[#414141] text-[14px] font-[500]">
                NRs.{deliveryFee}
              </span>
            </div>
          </div>
          <div className="flex justify-between border-t pt-2 border-[#F9E3B8]">
            <h3 className="text-[#858585] text-[15px]">Total</h3>
            <span className="text-[#414141] text-[14px] font-[500]">
              NRs.{total}
            </span>
          </div>
          <button
            onClick={handleCheckout}
            className="bg-[#BA4A20] w-full py-2.5 rounded-full text-[16px] font-[400] text-white"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
