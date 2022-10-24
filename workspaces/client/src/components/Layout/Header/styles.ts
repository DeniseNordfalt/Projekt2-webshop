import { isVisible } from "@testing-library/user-event/dist/utils";
import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  height: 4rem;
  background-color: #fff;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
`;

export const Logo = styled.h1`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 700;
  color: #000;
  a {
    text-decoration: none;
    color: #000;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 20rem;
`;

export const NavItem = styled.a`
  font-size: 1rem;
  font-weight: 500;
  color: #000;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    color: #007bff;
  }

  &.active {
    color: #007bff;
  }
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 10rem;
`;

export const UserAvatar = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;

export const UserName = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #000;

  &.hover {
    #usermenu {
      display: block;
    }
  }
`;

export const UserMenu = styled.div`
  position: absolute;
  top: 4rem;
  right: 0;
  width: 10rem;
  padding: 1rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
  display: ${(props: { isVisible: boolean }) =>
    props.isVisible ? "block" : "none"};
`;

export const UserMenuItem = styled.a`
  display: block;
  font-size: 1rem;
  font-weight: 500;
  color: #000;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #007bff;
  }
`;
