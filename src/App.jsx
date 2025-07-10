import React from "react";

import { Route, Routes } from "react-router-dom";
import Layout from "./HOC/Layout";
import Textiles from "./Pages/Textiles";
import Jewelry from "./Pages/Jewelry";
import Ceramics from "./Pages/Ceramics";
import Artifacts from "./Pages/Artifacts";
import Wellness from "./Pages/Wellness";
import Shopall from "./Pages/Shopall";
import Decor from "./Pages/Decor";
import Home from "./Pages/Home";


const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop_all" element={<Shopall />} />
          <Route path="/decor" element={<Decor />} />
          <Route path="/textiles" element={<Textiles />} />
          <Route path="/jewelry" element={<Jewelry />} />
          <Route path="/ceramics" element={<Ceramics />} />
          <Route path="/artifacts" element={<Artifacts />} />
          <Route path="wellness" element={<Wellness />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
