import React, { useState } from "react";
import Layout from "../components/Layout";
import { ProductItem } from "@project-webbshop/shared";
import ProductFeed from "../components/ProductFeed";
import UserModal from "../components/UserModal";
import styled from "styled-components";

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
