import React from 'react'
import { CartItem } from '@project-webbshop/shared';
import styled from 'styled-components';

const Container = styled.div`
  width: 50%;
  display: flex;
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
  width: 100%;
  height: 20%;
`;

type Props = {
  data: CartItem;
};

const OrderCard = ({data}: Props) => {
  const renderImage = (imageName: string): string =>  {
    return `http://localhost:8800/uploads/${imageName}`
  }
   
  return (
    <Container key={data._id}>
      <Thumbnail src={renderImage((data.images[0] as any).filename)} />
      <TextWrapper>
        <h3 style={{margin: "10px"}}>{data.product}</h3>
        <p>{data.price}</p>
      </TextWrapper>
    </Container>
  )
}

export default OrderCard