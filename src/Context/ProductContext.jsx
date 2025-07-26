// src/Context/ProductContext.js
import { createContext, useState, useContext } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [refreshProducts, setRefreshProducts] = useState(false);

  const triggerRefresh = () => setRefreshProducts(prev => !prev);

  return (
    <ProductContext.Provider value={{ refreshProducts, triggerRefresh }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook
export const useProduct = () => useContext(ProductContext);
