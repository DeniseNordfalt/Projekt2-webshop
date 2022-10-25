import { CartItem } from "@project-webbshop/shared";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getAllOrders, getOrders } from "../api";
import { UserContext } from "../App";

import OrderCard from "./OrderCard";

type Props = {};

const StyledList = styled.div`
  display: flex;
  flex-direction: center;
  justify-content: center;
  flex-wrap: wrap;
  overflow-y: scroll;
`;

const OrderFeed = () => {
  const [orderList, setOrderList] = useState<CartItem[]>([]);
  const { user } = useContext(UserContext);
  
  const fetchData = async () => {
  let data: CartItem[] = [];
    if (user?.roles.includes("admin") && window.location.pathname === "/admin") {
      data = await getAllOrders();
    } else {
      data = await getOrders();
    }
    setOrderList(data);
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <div>
      <StyledList>
        {orderList.map((orderList) => {
          return <OrderCard data={orderList} key={orderList._id} />;
        })}
      </StyledList>
      <div></div>
    </div>
  );
};

export default OrderFeed;
