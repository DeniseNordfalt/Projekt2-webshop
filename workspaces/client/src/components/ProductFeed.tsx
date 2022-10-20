import { ProductItem } from "@project-webbshop/shared";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getProducts } from "./api";
import ProductCard from "./ProductCard";
import { decode } from "base-64";
import CategoryList from "./CategoryList";

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
    setProductList(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const uniqueCatagories: string[] = [];
  productList.forEach((item) => {
    if (
      !uniqueCatagories.includes(
        item.category) && item.category
    ) {
      uniqueCatagories.push(item.category);
    }
  });

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <CategoryList data={uniqueCatagories} />
      <StyledList>
        <>
          {console.log(
            productList.filter((product) => product.category === category)
          )}
        </>
        {category
          ? productList
              .filter((product) => product.category === category)
              .map((product) => {
                return <ProductCard data={product} key={product._id} />;
              })
          : productList.map((product) => {
              return <ProductCard data={product} key={product._id} />;
            })}
      </StyledList>
    </div>
  );
};

export default ProductFeed;
