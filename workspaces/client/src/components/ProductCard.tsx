import { ProductItem } from "@project-webbshop/shared";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 250px;
  height: 320px;
  overflow-y: none;
  margin: 10px; 
  padding: 10px;
  border: 1px solid black;
`;

type ThemeProps = {
  src?: string;
};

const Thumbnail = styled.div`
  position: relative;
  width: 100%;
  height: 35%;
  background-image: ${(props: ThemeProps) => `url(${props.src})`};
  background-position: center;
  background-size: cover;
`;

const TextWrapper = styled.div`
padding: 5px 15px 15px 15px;
height: 55%;
overflow: hidden;
`;

type Props = {
  data: ProductItem;
};

const ProductCard = ({ data }: Props) => {
  return (
    <Container>
      <Thumbnail src={data.images[0]} />
      <TextWrapper>
        <h3 style={{margin: "10px"}}>{data.name}</h3>
        <p>{data.description}</p>
      </TextWrapper>
    </Container>
  );
};

export default ProductCard;
