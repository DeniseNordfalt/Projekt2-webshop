import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/:id" element={<ProductPage />}/>
    </Routes>
  );
}

export default App;
