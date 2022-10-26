import React, { useState } from "react";

import styled from "styled-components";

import ProfileCard from "../components/ProfileCard";
import EditUser from "../components/EditUser";

type Props = {};

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: 0 auto;
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

export default function ProfilePage({}: Props) {
  const [edit, setEdit] = useState(false);

  return (
    <>
      {!edit ? (
        <>
          <ButtonContainer>
            <ProfileCard />
            <StyledButton onClick={() => setEdit(true)}>
              Edit Profile
            </StyledButton>
          </ButtonContainer>
        </>
      ) : (
        <EditUser />
      )}
    </>
  );
}
