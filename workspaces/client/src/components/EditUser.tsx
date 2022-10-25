import React, { useState, useContext } from "react";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { UserContext } from "../App";
import { editUser } from "../api";

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

type Props = {};

export default function EditUser({}: Props) {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name as string,
    email: user?.email as string,
    phoneNumber: user?.phoneNumber as string,
    deliveryAddress: {
      streetName: user?.deliveryAddress?.streetName as string,
      streetNumber: user?.deliveryAddress?.streetNumber as number,
      county: user?.deliveryAddress?.county as string,
      postalCode: user?.deliveryAddress?.postalCode as number,
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await editUser(
      formData.name,
      formData.email,
      formData.phoneNumber,
      formData.deliveryAddress
    );
    window.location.reload();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <h3>Update information</h3>
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="phoneNumber">Phone number</label>
        <input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />

        <label htmlFor="streetName">Street name</label>
        <input
          type="text"
          name="streetName"
          id="streetName"
          value={formData.deliveryAddress.streetName}
          onChange={handleChange}
        />

        <label htmlFor="streetNumber">Street number</label>
        <input
          type="number"
          name="streetNumber"
          id="streetNumber"
          value={formData.deliveryAddress.streetNumber}
          onChange={handleChange}
        />

        <label htmlFor="county">County</label>
        <input
          type="text"
          name="county"
          id="county"
          value={formData.deliveryAddress.county}
          onChange={handleChange}
        />

        <label htmlFor="postalCode">Postal code</label>
        <input
          type="number"
          name="postalCode"
          id="postalCode"
          value={formData.deliveryAddress.postalCode}
          onChange={handleChange}
        />

        <StyledButton type="submit">Update</StyledButton>
      </StyledForm>
    </Container>
  );
}
