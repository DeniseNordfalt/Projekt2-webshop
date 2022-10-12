import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { ProductItem } from "@project-webbshop/shared";
import {useParams} from "react-router-dom";
import { getProductById } from "../components/api";

type Props = {};

export default function ProductPage(props: Props) {
  const [product, setProduct] = useState<ProductItem | null>(null);
  const productId = useParams().id;


const fetchData = async () => {
  const data = await getProductById(productId || "")
  console.log(data)
  setProduct(data)
}

  useEffect(()=> {
    fetchData()
  }, [])

  return (
    <>
      <Layout />
      {product && <div>
        {product.name}
      </div>}
    </>
  );
}
