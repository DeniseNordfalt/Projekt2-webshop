import React from "react";
import Layout from "../components/Layout";
import ProductFeed from "../components/ProductFeed";
type Props = {};

export default function Home({}: Props) {
  return (
    <>
      <Layout>
        <div>
          <h2>Products</h2>
          <ProductFeed />
        </div>
      </Layout>
    </>
  );
}
