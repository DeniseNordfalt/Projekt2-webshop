import { ProductItem } from "@project-webbshop/shared";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { addNewProduct, getProducts, seachForProducts } from "../api";
import ProductCard from "./ProductCard";
import { decode } from "base-64";
import CategoryList from "./CategoryList";
import SearchBar from "./SearchBar";
import ProductModal from "./ProductModal";
import { UserContext } from "../App";

const StyledList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;
const StyledButton = styled.button`
  background: black;
  color: white;
  font-size: 18px;
  width: 100%;
  height: auto;
  border: none;
  margin:6px ;
  padding: 15px;
  &:hover {
    background: grey;
    transition-duration: 0.4s;
    cursor: pointer;
  }
`;
type Props = {};

const ProductFeed = (props: Props) => {
  const [productList, setProductList] = useState<ProductItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const { user } = useContext(UserContext);
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
    if (searchTerm !== "") {
      const res = await seachForProducts(searchTerm);

      if (res && res.length > 0) {
        setProductList(res);
      }
    }
  };

  const handleNewProduct = (
    target: any,
    updateProduct: ProductItem | Partial<ProductItem> | null
  ): void => {
    const files = target[5].files;
    const formData = new FormData();

    for (const key in updateProduct) {
      if (key !== "images") {
        formData.append(
          key,
          updateProduct[key as keyof ProductItem] as unknown as string
        );
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
    window.location.reload()
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <aside style={{ marginLeft: "10px" }}>
        <SearchBar filterFeedOnSearch={filterFeedOnSearch} />
        <>
          {user && user?.roles?.includes("admin") && (
            <StyledButton
              onClick={() => {
                setIsModalVisible(true);
              }}
              
            >
              Add product
            </StyledButton>
          )}
        </>
        {isModalVisible && (
          <ProductModal
            data={{
              name: "",
              description: "",
              weight: "0",
              price: "",
              manufacturer: "",
              category: "",
              images: [],
            }}
            handleOnSubmit={handleNewProduct}
            setVisibility={setIsModalVisible}
          />
        )}
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
