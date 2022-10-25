import React, { useState, useReducer } from "react";
import { registerUser } from "../api";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: aliceblue;
  max-width: 50%;
  margin: 2rem auto;
  padding: 10px;
  height: auto;
  border-radius: 15px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;
  width: 80%;
  height: auto;
  padding-bottom: 2rem;
`;

const StyledButton = styled.button`
  background-color: white;
  border: 1px solid black;
  color: black;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
  margin-top: 1rem;
  cursor: pointer;

  &:hover {
    box-shadow: 2px 2px 2px lightgray;
  }
`;

export default function RegisterUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    deliveryAddress: {
      streetName: "",
      streetNumber: "",
      postalCode: "",
      county: "",
    },
  });

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await registerUser(
      formData.name,
      formData.email,
      formData.password,
      formData.phoneNumber,
      formData.deliveryAddress
    );
  };

  return (
    <Container>
      <h3>Register</h3>
      <StyledForm onSubmit={handleRegister}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <label>Phone number</label>
        <input
          type="text"
          name="phonenumber"
          onChange={(e) =>
            setFormData({ ...formData, phoneNumber: e.target.value })
          }
        />

        <label>Street name</label>
        <input
          type="text"
          name="streetname"
          onChange={(e) =>
            setFormData({
              ...formData,
              deliveryAddress: {
                ...formData.deliveryAddress,
                streetName: e.target.value,
              },
            })
          }
        />

        <label>Street number</label>
        <input
          type="number"
          name="streetnumber"
          onChange={(e) =>
            setFormData({
              ...formData,
              deliveryAddress: {
                ...formData.deliveryAddress,
                streetNumber: e.target.value,
              },
            })
          }
        />

        <label>County</label>
        <input
          type="text"
          name="county"
          onChange={(e) =>
            setFormData({
              ...formData,
              deliveryAddress: {
                ...formData.deliveryAddress,
                county: e.target.value,
              },
            })
          }
        />

        <label>Postal code</label>
        <input
          type="number"
          name="postalcode"
          onChange={(e) =>
            setFormData({
              ...formData,
              deliveryAddress: {
                ...formData.deliveryAddress,
                postalCode: e.target.value,
              },
            })
          }
        />

        <StyledButton type="submit">Register</StyledButton>
      </StyledForm>
    </Container>
  );
}
