import React, { useState, useContext } from "react";
import styled from "styled-components";

import { LoginUser } from "./LoginUser";
import RegisterUser from "./RegisterUser";

type Props = {};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  max-width: 300px;
  background-color: aliceblue;
  border-radius: 15px;
  padding: 1rem;
`;

const StyledButton = styled.button`
  background-color: white;
  border: 1px solid black;
  color: black;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  font-weight: bold;

  cursor: pointer;

  &:hover {
    box-shadow: 2px 2px 2px lightgray;
  }
`;

export default function UserModal({}: Props) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <div>
        {isLogin ? (
          <>
            <LoginUser />
            <ButtonContainer>
              <StyledButton onClick={() => setIsLogin(false)}>
                Need to register?
              </StyledButton>
            </ButtonContainer>
          </>
        ) : (
          <RegisterUser />
        )}
      </div>
    </>
  );
}
