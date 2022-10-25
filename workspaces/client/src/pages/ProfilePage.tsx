import React from "react";

import styled from "styled-components";

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
  return (
    <div>
      <ProfileCard />
    </div>
  );
}
