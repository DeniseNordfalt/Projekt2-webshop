import React from "react";
import ProductFeed from "../components/ProductFeed";

type Props = {};

export default function Home({}: Props) {
  return (
    <>
        <div>
          <h2>Products</h2>
          <ProductFeed />
        </div>
    </>
  );
}
