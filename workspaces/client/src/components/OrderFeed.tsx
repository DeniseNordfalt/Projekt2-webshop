import { CartItem, OrderItem } from "@project-webbshop/shared";
import React, { useEffect, useState, useContext } from "react";
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
  const [orderList, setOrderList] = useState<OrderItem[]>([]);
  const { user } = useContext(UserContext);
  
  const fetchData = async () => {
  let data: OrderItem[] = [];
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
        {orderList.map((order) => {
          return <OrderCard data={order} key={order._id}/>;
        })}
      </StyledList>
      <div></div>
    </div>
  );
};

export default OrderFeed;
