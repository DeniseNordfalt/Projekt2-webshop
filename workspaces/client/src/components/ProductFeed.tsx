import { ProductItem } from "@project-webbshop/shared";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { addNewProduct, getProducts, seachForProducts } from "../api";
import ProductCard from "./ProductCard";
import { decode } from "base-64";
import CategoryList from "./CategoryList";
import SearchBar from "./SearchBar";
import ProductModal from "./ProductModal";

const StyledList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;
type Props = {};

const ProductFeed = (props: Props) => {
  const [productList, setProductList] = useState<ProductItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
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
    if (!uniqueCatagories.includes(item.category) && item.category) {
      uniqueCatagories.push(item.category);
    }
  });

  const filterFeedOnSearch = async (searchTerm: string) => {
    const res = await seachForProducts(searchTerm);
    setProductList(res);
  };

  const handleNewProduct = (target: any, updateProduct: ProductItem | Partial<ProductItem> | null): void => {
    const files = target[5].files;
    const formData = new FormData();

    for (const key in updateProduct) {
      if (key !== "images") {
        formData.append(key, (updateProduct[key as keyof ProductItem] as unknown) as string);
      } else continue;
    }
    if (files?.length) {
      for (const key in files) {
        formData.append("files", files[key]);
      }
    }
    addNewProduct(formData);
    fetchData();
    setIsModalVisible(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <aside style={{ marginLeft: "10px" }}>
        <SearchBar filterFeedOnSearch={filterFeedOnSearch} />
        <div onClick={() => {setIsModalVisible(true)}}
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "15px",
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          Add product
        </div>
        {isModalVisible && <ProductModal data={{name: "", description: "", weight:"0", price:"", manufacturer:"", category:"", images: []}} handleOnSubmit={handleNewProduct} setVisibility={setIsModalVisible}/>}
        <CategoryList data={uniqueCatagories} />
      </aside>
      <StyledList>
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
