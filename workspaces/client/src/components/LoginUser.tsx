import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { loginUser } from "../api";
import { UserContext } from "../App";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: aliceblue;
  max-width: 50%;
  margin: 2rem auto;
  padding: 2rem auto;
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

export const LoginUser = (props: Props) => {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext);

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await loginUser(email, password);
    setUser(data);
    navigate("/")

  };

  return (
    <div>
      <Container>
        <h3>Login to account</h3>
        <StyledForm onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <StyledButton>Login</StyledButton>
        </StyledForm>
      </Container>
    </div>
  );
};
