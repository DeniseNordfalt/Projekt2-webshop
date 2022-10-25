import { ProductItem } from "@project-webbshop/shared";
import React, { useEffect } from "react";
import { getProducts } from "../api";
import OrderFeed from "./OrderFeed";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;
const StyledListItem = styled.li`
  display: flex;
    flex-direction: column;
`;

type Props = {};

const AdminView = (props: Props) => {
  const [products, setProducts] = React.useState<ProductItem[]>([]);

  useEffect(() => {
    getProducts().then((data: ProductItem[]) => {
      setProducts(data);
    });
  }, []);
  return (
    <Container>
        <OrderFeed />
    </Container>
  );
};

export default AdminView;
