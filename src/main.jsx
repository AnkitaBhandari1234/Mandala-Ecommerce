import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";


import App from "./App.jsx";

import { BrowserRouter as Router } from "react-router-dom";
import { CartProvider } from "./Context/CartContext.jsx";
import { WishlistProvider } from "./Context/WishlistContext.jsx";
import { UserProvider } from "./Context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <Router>
        <UserProvider>

    <CartProvider>
      <WishlistProvider>
            
        <App />
      </WishlistProvider>
    </CartProvider>
        </UserProvider>
      </Router>
  </StrictMode>
);
