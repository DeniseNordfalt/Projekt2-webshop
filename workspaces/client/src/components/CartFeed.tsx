import { CartItem, ProductItem } from "@project-webbshop/shared";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { deleteCartItem, getCart, purchase } from "../api";

import CartCard from "./CartCard";

type Props = {};

const StyledList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const DivFixed = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 32em;
  width: 350px;
  right: 0;

  padding-top: 10px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: center;
  justify-content: center;
  align-items: center;
`;
const StyledButton = styled.button`
  background: black;
  color: white;
  font-size: 18px;
  width: auto;
  height: 20%;
  border: none;
  padding: 15px;
  &:hover {
    background: grey;
    transition-duration: 0.4s;
    cursor: pointer;
  }
`;

const CartFeed = () => {
  const [cart, setCart] = useState<CartItem | null>(null);

  //  const totalCost = cart.reduce((total: number, item: Partial<CartItem & ProductItem>): number => {
  //     return total + parseInt(item?.price?.replace(/\D+/g, ""))

  //  }, 0 )

  const createPurchase = () => {
    purchase();
    fetchData();
  };

  const fetchData = async () => {
    const data = await getCart();
    console.log(data);

    setCart(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <StyledList>
        {cart?.products.map((item: any) => {
          return <CartCard fetchData={fetchData} item={item} key={item._id} />;
        })}
      </StyledList>

      <DivFixed>
        {/* { <h3>Total: { `${totalCost} kr`}  </h3> } */}

        <StyledButton onClick={(e) => createPurchase()}>Purchase</StyledButton>
      </DivFixed>
    </>
  );
};

export default CartFeed;
