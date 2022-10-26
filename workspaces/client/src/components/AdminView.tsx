import React from "react";
import OrderFeed from "./OrderFeed";
import styled from "styled-components";

const Container = styled.div`
width: 100%;
`;

type Props = {};

const AdminView = (props: Props) => {
  return (
    <Container>
        <OrderFeed />
    </Container>
  );
};

export default AdminView;
