import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import "./App.css";

import { UserItem } from "@project-webbshop/shared";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProductPage from "./pages/ProductPage";
import UserPage from "./pages/UserPage";
import CartPage from "./pages/CartPage";

import OrderPage from "./pages/OrderPage";

import ProfilePage from "./pages/ProfilePage";
import Admin from "./pages/AdminPage";

const UserContext = createContext<{
  user: UserItem | null;
  setUser: Dispatch<SetStateAction<UserItem | null>>;
}>({
  user: null,
  setUser: () => {},
});

function App() {
  const [user, setUser] = useState<UserItem | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:category" element={<Home />} />

          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/shoppingcart" element={<CartPage />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/me" element={<ProfilePage />} />
          
        </Routes>
      </Layout>
    </UserContext.Provider>
  );
}

export { UserContext };
export default App;
