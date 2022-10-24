import React, { useContext } from "react";
import { useEffect } from "react";
import styled from "styled-components";

import { UserContext } from "../App";

import ProfileCard from "../components/ProfileCard.tsx";

type Props = {};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: aliceblue;
  max-width: 50%;
  margin: 2rem auto;
  padding: 10px;
  height: auto;
  border-radius: 15px;
`;

export default function ProfilePage({}: Props) {
  const { user } = useContext(UserContext);

  console.log("user", user);

  // useEffect(() => {
  //     if (!user) {
  //         window.location.href = "/login";
  //     }
  // }, [user]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContactInfo({ ...contactInfo, [event.target.name]: event.target.value });
  };

  const [contactInfo, setContactInfo] = React.useState({
    email: "",
    name: "",
    phoneNumber: "",
  });

  return (
    <div>
      <Container>
        <h2>Welcome {user?.name}</h2>

        <h3>User info</h3>
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
        <p>Phone number: {user?.phoneNumber}</p>

        <h3>Address</h3>
        <p>Streetname: {user?.deliveryAddress?.streetName}</p>
        <p>Street number: {user?.deliveryAddress?.streetNumber}</p>
        <p>Postal code: {user?.deliveryAddress?.postalCode}</p>
        <p>County: {user?.deliveryAddress?.county}</p>
      </Container>

      <ProfileCard />
    </div>
  );
}
