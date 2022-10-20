import { ProductItem } from "@project-webbshop/shared";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getProducts } from "./api";
import ProductCard from "./ProductCard";
import { decode } from "base-64";

const StyledList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;
type Props = {};

const ProductFeed = (props: Props) => {
  const [productList, setProductList] = useState<ProductItem[]>([]);
  const category = decode(useParams().category || "");

  const fetchData = async () => {
    const data = await getProducts();
    if (!category) {
      console.log("HERE");

      setProductList(data);
    } else {

      setProductList(data.filter((product) => product.category === category));
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <StyledList>
        {productList.map((product) => {
          return <ProductCard data={product} key={product._id} />;
        })}
      </StyledList>
    </div>
  );
};

export default ProductFeed;
