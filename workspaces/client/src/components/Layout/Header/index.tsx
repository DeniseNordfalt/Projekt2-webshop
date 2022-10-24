import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import * as s from "./styles";

import { getUser } from "../../../api";

import { UserContext } from "../../../App";

type Props = {};

export default function Header({}: Props) {
  const { user, setUser } = useContext(UserContext);
  const [isVisible, setIsVisible] = React.useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const fetchUser = async () => {
    const data = await getUser();
    setUser(data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };

  return (
    <s.Container>
      <s.Logo>
        <Link to={"/"}>WEBSHOP</Link>
      </s.Logo>

      {user ? (
        <s.User>
          <s.UserName onClick={handleClick}>{user?.name}</s.UserName>

          <s.UserMenu isVisible={isVisible}>
            <s.UserMenuItem href="/me">Profile</s.UserMenuItem>
            <s.UserMenuItem href="/orders">Orders</s.UserMenuItem>
            <s.UserMenuItem href="/shoppingcart">ShoppingCart</s.UserMenuItem>
            <s.UserMenuItem onClick={logout}>Logout</s.UserMenuItem>
          </s.UserMenu>
        </s.User>
      ) : (
        <s.User>
          <s.UserMenuItem href="/user">Login</s.UserMenuItem>
        </s.User>
      )}
    </s.Container>
  );
}
