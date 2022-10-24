import { ProductItem } from "@project-webbshop/shared";
import React from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 250px;
  min-height: 350px;
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
  height: 75%;
  background-image: ${(props: ThemeProps) => `url(${props.src})`};
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const TextWrapper = styled.div`
padding: 5px 15px 15px 15px;
height: 20%;
overflow: hidden;
`;

type Props = {
  data: ProductItem;
};

const ProductCard = ({ data }: Props) => {
  const navigate = useNavigate();

const renderImage = (imageName: string) =>  {
  console.log(imageName);
  return `http://localhost:8800/uploads/${imageName}`
}

  return (
    <Container onClick={() => {
      navigate(`/products/${data._id}`)}} key={data._id}>
      <Thumbnail src={`${renderImage((data!.images[0] as any).filename)}`  || ""} />
      <TextWrapper>
        <h3 style={{margin: "10px"}}>{data.name}</h3>
      </TextWrapper>
    </Container>
  );
};

export default ProductCard;
