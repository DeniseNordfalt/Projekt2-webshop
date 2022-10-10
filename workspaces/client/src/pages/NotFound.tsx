import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;
  color: #333;
  font-size: 2rem;
  font-weight: 700;
`;

const H1 = styled.h1`
  font-size: 10rem;
  font-weight: 700;
  color: red;
`;

type Props = {};

export default function NotFound({}: Props) {
  return (
    <StyledDiv>
      <H1>404</H1>
      <p>Page not found</p>
    </StyledDiv>
  );
}
