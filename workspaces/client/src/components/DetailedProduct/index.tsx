import { ProductItem } from "@project-webbshop/shared";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { encode } from "base-64";
import { addToCart, getProductById } from "../../api";
import Layout from "../Layout";
import * as s from "./styles";

type Props = {};

const DetailedProduct = (props: Props) => {
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

  useEffect(() => {
    setCurrentImage(product?.images[0] || "");
  }, [product]);

  const handleOnClick = (productId: string) => {
    console.log(productId)
    addToCart(productId)
  };

  return (
    <>
      {product && (
        <div>
          <p>
            <a href="/">Home</a> &#62;{" "}
            <a href={`/${encode(product.category)}`}>{product.category}</a>{" "}
            &#62; {product.name}
          </p>

          <h2 style={{ textAlign: "center" }}>{product.name}</h2>
          <p style={{ textAlign: "center" }}>{product.manufacturer}</p>
          <s.ProductInfoWrapper>
            <div style={{ width: "100%" }}>
              {currentImage && (
                <>
                  <img src={currentImage} alt={product.name} />
                  <s.Thumbnails>
                    {product.images.map((image, index) => {
                      return (
                        <img
                          key={index}
                          src={currentImage}
                          onClick={(e: any) => {
                            setCurrentImage(e.target?.src);
                          }}
                          alt={product.name}
                        />
                      );
                    })}
                  </s.Thumbnails>
                </>
              )}
            </div>
            <s.InfoContainer>
              <div>
                <p style={{ fontSize: "20px" }}>{product.price}</p>
                <p>{product.weight}</p>
              </div>
              <p>{product.description}</p>
              <s.StyledButton onClick={(e) => handleOnClick(product._id as string)}>
                Add to cart
              </s.StyledButton>
            </s.InfoContainer>
          </s.ProductInfoWrapper>
        </div>
      )}
    </>
  );
};

export default DetailedProduct;
