import { ProductItem } from "@project-webbshop/shared";
import React from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import { addToCart } from "../api";

const Container = styled.div`
  width: 100%;
  max-width: 250px;
  min-height: 400px;
  overflow-y: none;
  margin: 10px; 
  padding: 10px;
  border: 1px solid black;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  &:hover {
    box-shadow: 0px 8px 6px -3px  grey;
    cursor:pointer;
  }
`;
const ImgText = styled.div`
  width: 100%;
  height:80%;
  
 
  
`;

type ThemeProps = {
  src?: string;
};

const Thumbnail = styled.div`
  position: relative;
  width: 100%;
  height: 55%;
  background-image: ${(props: ThemeProps) => `url(${props.src})`};
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;
const StyledButton  = styled.button`
  
background:black;
color: white;
font-size: 18px;
width:100%;
height:20%;
border: none;
padding: 15px;
&:hover {
  background:grey;
  transition-duration: 0.4s;
  cursor:pointer;
}


`

const TextWrapper = styled.div`
padding: 5px 15px 15px 15px;
height: 100%;
overflow: hidden;
`;

type Props = {
  data: ProductItem;
};
const handleOnClick = (productId: string) => {
  addToCart(productId, 1)
}

const ProductCard = ({ data }: Props) => {
  const navigate = useNavigate();

const renderImage = (imageName: string) =>  {
  return `http://localhost:8800/uploads/${imageName}`
}

  return (
    
    <Container >
      <ImgText onClick={() => {
      navigate(`/products/${data._id}`)}} key={data._id}>
      <Thumbnail src={`${renderImage((data!.images[0] as any)?.filename)}`  || ""} />
      <TextWrapper>
        <h3 style={{margin: "10px"}}>{data.name}</h3>
        
      </TextWrapper>
      </ImgText>
      <StyledButton onClick={(e) => {handleOnClick(data._id as string)}}> Add to cart </StyledButton>
    </Container>
  );
};

export default ProductCard;
