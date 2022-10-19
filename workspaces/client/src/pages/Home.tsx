import React, { useState } from "react";
import Layout from "../components/Layout";
import { ProductItem } from "@project-webbshop/shared";
import ProductFeed from "../components/ProductFeed";
type Props = {};

export default function Home({}: Props) {

  return (
    <>
      <Layout />
      <div>
        <h2>Products</h2>
        <ProductFeed />
      </div>
    </>
  );
}
