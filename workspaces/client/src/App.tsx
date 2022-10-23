import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import "./App.css";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProductPage from "./pages/ProductPage";
import UserPage from "./pages/UserPage";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:category" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/products/:id" element={<ProductPage />}/>
        <Route path="/user" element={<UserPage />} />
        <Route path="/shoppingcart" element={<CartPage />} />
        <Route path="/orders" element={<OrderPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
