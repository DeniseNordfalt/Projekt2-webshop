import React from "react";
import Header from "./Header";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

const Wrapper = styled.div`
  max-width: 1500px;
  margin: 0 auto;
`;

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <Wrapper>{children}</Wrapper>
    </>
  );
}
