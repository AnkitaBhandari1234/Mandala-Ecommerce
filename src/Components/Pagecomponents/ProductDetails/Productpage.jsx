import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Product } from "../../../assets/Product";
import Wishlist from '../../../assets/wishlist.svg';
import { IoIosStar } from "react-icons/io";
import Cart from '../../../assets/cart.svg';
import { CartContext } from "../../../Context/CartContext";
import AddToCartButton from "../../UI/AddtocartButton";

const ProductPage = ({ category }) => {
  const { category: routeCategory } = useParams();
  const selectedCategory = category || routeCategory || "all";
 
  const { addToCart } = useContext(CartContext)
//  filter products
  const filteredProducts =
    selectedCategory === "all"
      ? Product
      : Product.filter(
          (product) =>
            product.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="p-6 font-poppins">
      <h2 className="text-2xl font-semibold capitalize mb-4 text-[#BA4A20]">
        {selectedCategory === "all" ? "All Products" : selectedCategory}
      </h2>

      <div className="grid  grid-cols-4 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product,i) => (
            <div className="bg-white w-[265px] h-[350px] rounded-2xl shadow-lg my-4" key={i} >
                    <div className="w-full h-[200px] relative ">
                      <img src={product.image} alt="" className=" object-cover h-[200px] mx-auto" />
                      <img src={Wishlist} alt="" className="absolute top-5 right-5"/>
                      
                    </div>
                    {/* text-content */}
                    <div className="px-4 py-7 flex  flex-col gap-3">
                    <div className="flex justify-between ">
                      <p className="flex items-center text-[#999] font-poppins text-[12px] font-[400] trackinh-[-0.12px]">
                        <span className="flex ">
                          <IoIosStar className="text-yellow-400 text-base" />
                          <IoIosStar className="text-yellow-400 text-base" />
                          <IoIosStar className="text-yellow-400 text-base" />
                          <IoIosStar className="text-yellow-400 text-base" />
                          <IoIosStar className="text-yellow-400 text-base" />
                        
                        </span>
                        {product.rating}

                      </p>
                      <span className="text-[#6B7280] font-poppins text-[13px] font-medium">{product.price}</span>
                    </div>
                      <h4 className="text-[#414141] font-poppins text-[15px] font-semibold">{product.name}</h4>
                      

                      <AddToCartButton product={product}/>
                      
                  </div>
                  </div>
          ))
        ) : (
          <p>No products found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
