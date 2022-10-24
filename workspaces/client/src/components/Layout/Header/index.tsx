import React from "react";
import * as s from "./styles";

type Props = {};

export default function Header({}: Props) {
  return (
    <s.Container>
      <s.Logo>LOGO</s.Logo>
      <s.Nav>
        <s.NavItem href="/">Home</s.NavItem>
        <s.NavItem href="/user">user</s.NavItem>
        <s.NavItem href="/orders">orders</s.NavItem>
        <s.NavItem href="/shoppingcart">Shoppingcart</s.NavItem>
      </s.Nav>

      <s.User>
        <s.UserAvatar />
        <s.UserName>John Doe</s.UserName>
        <s.UserMenu>
          <s.UserMenuItem>Profile</s.UserMenuItem>
          <s.UserMenuItem>Logout</s.UserMenuItem>
        </s.UserMenu>
      </s.User>
    </s.Container>
  );
}
