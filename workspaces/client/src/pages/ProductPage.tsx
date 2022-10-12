import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { ProductItem } from "@project-webbshop/shared";
import { useParams } from "react-router-dom";
import { getProductById } from "../components/api";
import styled from "styled-components";

type Props = {};

const ProductInfoWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  margin: 40px auto;
  max-width: 1000px;
  img {
    width: 100%;
    max-width: 350px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;`

  const Thumbnails = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  img{
    width: 100%;
    max-width: 70px;
    margin-right: 10px;
  }
  `
  const StyledButton  = styled.button`
  background-color: black;
  color: white;
  font-size: 18px;
  border:none;
  padding: 15px;
  `

export default function ProductPage(props: Props) {
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [currentImage, setCurrentImage] = useState<string>("");
  const productId = useParams().id;

  const fetchData = async () => {
    const data = await getProductById(productId || "");
    setProduct(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(()=> {
    setCurrentImage(product?.images[0] || "");
  }, [product])


  const handleOnClick = () => {
console.log("CLICKED", productId)
  }
  return (
    <>
      <Layout />
      {product && (
        <div>
          <h2 style={{textAlign: "center"}}>{product.name}</h2>
          <ProductInfoWrapper>
            <div style={{width: "100%"}}>
            {currentImage && <><img src={currentImage} alt={product.name} />
            <Thumbnails>
              {product.images.map((image, index) => {
                return <img key={index} src={currentImage} onClick={(e: any) => {setCurrentImage(e.target?.src)}} />
              })}
            </Thumbnails></>}
            </div>
            <InfoContainer>
              <div>
              <p style={{fontSize: "20px"}}>{product.price}</p>
              <p>{product.weight}</p>
              </div>
            <p>{product.description}</p>
            <StyledButton onClick={handleOnClick}>Add to cart</StyledButton>
            </InfoContainer>
          </ProductInfoWrapper>
        </div>
      )}
    </>
  );
}
