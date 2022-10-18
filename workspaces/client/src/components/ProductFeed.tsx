import { ProductItem } from "@project-webbshop/shared";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getProducts } from "./api";
import ProductCard from "./ProductCard";


const StyledList = styled.ul`
display: flex;
flex-wrap: wrap;
`
type Props = {};

const ProductFeed = (props: Props) => {
  const [productList, setProductList] = useState<ProductItem[]>([]);

  const fetchData = async () => {
    const data = await getProducts();
    setProductList(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <StyledList>
        {productList.map((product) => {
          return <ProductCard data={product} key={product._id}/>;
        })}
      </StyledList>
    </div>
  );
};

export default ProductFeed;
