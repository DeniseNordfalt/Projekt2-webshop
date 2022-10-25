import React from "react";
import { CartItem, OrderItem } from "@project-webbshop/shared";
import styled from "styled-components";
import * as s from "./styles";
import { updateOrderStatus } from "../../api";

const TextWrapper = styled.div`
  width: 100%;
  height: 20%;
`;

type Props = {
  data: OrderItem;
  isAdmin: boolean;
};

const OrderCard = ({ data, isAdmin }: Props) => {
  const renderImage = (imageName: string): string => {
    return `http://localhost:8800/uploads/${imageName}`;
  };

  const deliveryAdress = `${data.deliveryAddress.streetName} ${data.deliveryAddress.streetNumber} ${data.deliveryAddress.county} ${data.deliveryAddress.postalCode}`;
  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    const res = await updateOrderStatus(data._id, e.target[0].value);
    res.message === "Status updated" && window.location.reload();
  };

  const renderStatusOptions = () => {
    const options = ["behandlas", "registrerad", "under leverans", "levererad"];
    return options.map((option, index) => {
      return <option key={index} value={option}>
          {option}
        </option>
    });
  };
  return (
    <s.Container>
      <h3>
        Order: {data.createdAt.replace(/(\W+|[A-Z]+)/gi, "") + data.userId}
      </h3>
      {isAdmin && <h3>Customer</h3>}
      <ul>
        <li>Customer id: {data.userId}</li>
        <li>Address: {deliveryAdress}</li>
        <li>
          Status: {data.status}
        </li>
        {isAdmin && <li>Update status: <form onSubmit={handleOnSubmit}>
            <select id="status" name="status" defaultValue={data.status}>
            {renderStatusOptions()}
            </select>
            <input type="submit" value="Submit" />
          </form></li>}
      </ul>
      <s.ProductList>
        {data.products.map((product, index) => {
          return (
            <s.ProductList key={index}>
              <s.ProductInfo>
                <s.Thumbnail src={renderImage(data.products[0].image)} />
                <h5>
                  {product.manufacturer} - {product.name}
                </h5>
              </s.ProductInfo>
              <s.PricingContainer>
                <span>Per unit: {product.price}</span>
                <span>Qty: {product.quantity}</span>
                <span>
                  Total:{" "}
                  {parseInt(product.price.replace(/\D+/g, "")) *
                    product.quantity +
                    " kr"}
                </span>
              </s.PricingContainer>
            </s.ProductList>
          );
        })}
      </s.ProductList>
      <p style={{ textAlign: "right" }}>Shipping cost: {data.shippingCost}</p>
      <p style={{ textAlign: "right", fontWeight: "bold" }}>
        Total cost: {data.totalCost}
      </p>
    </s.Container>
  );
};

export default OrderCard;
