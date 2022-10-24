import { CartItem, ProductItem } from '@project-webbshop/shared';
import React from 'react'
import styled from 'styled-components';
import { deleteCartItem } from '../api';
import CartFeed from './CartFeed';


const Container = styled.div`
  width: 50%;
  display:flex;
  
  min-height: 200px;
  overflow-y: none;
  margin: 10px; 
  padding: 10px;
  border: 1px solid black;
`;

type ThemeProps = {
  src?: string;
};

const Thumbnail = styled.div`
  
  width: 40%;
  height: 75%;
  background-image: ${(props: ThemeProps) => `url(${props.src})`};
  background-position: left-center;
  background-size: contain;
  background-repeat: no-repeat;
  margin:0;
  padding:0;

`;

const TextWrapper = styled.div`
width:100%;
height: 20%;

`;

type Props = {
  data: CartItem;
 
};

const OrderCard = ({data}: Props) => {
   
  
  


  
  return (
    <Container key={data._id}>

      <Thumbnail src={data.images[0]} />
      <TextWrapper>
        <h3 style={{margin: "10px"}}>{data.product}</h3>
        <p>{data.price}</p>
       
        
      </TextWrapper>
      
      
    </Container>
  )
}

export default OrderCard