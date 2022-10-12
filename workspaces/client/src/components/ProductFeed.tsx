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

const fakeData: ProductItem[] = [
  {
    _id: "1",
    name: "mysteryItem1",
    description: "This is a mysterious item",
    category: "miscellaneous",
    weight: "2kg",
    price: "5000 kr",
    manufacturer: "mystery inc",
    images: ["https://images.unsplash.com/photo-1607166452427-7e4477079cb9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"],
  },
  {
    _id: "2",
    name: "mysteryItem1",
    description: "This is a mysterious item",
    category: "miscellaneous",
    weight: "2kg",
    price: "5000 kr",
    manufacturer: "mystery inc",
    images: ["https://images.unsplash.com/photo-1630448927918-1dbcd8ba439b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"],
  },
];

const ProductFeed = (props: Props) => {
  const [productList, setProductList] = useState<ProductItem[]>([]);

  const fetchData = async () => {
    const data = await getProducts();
    setProductList(data);
  };
  useEffect(() => {
    // fetchData();
    setProductList(fakeData);
  }, []);

  return (
    <div>
      <StyledList>
        {productList.map((product) => {
          return <ProductCard data={product} />;
        })}
      </StyledList>
    </div>
  );
};

export default ProductFeed;
