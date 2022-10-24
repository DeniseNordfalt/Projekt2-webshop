import React, { useContext } from "react";
import * as s from "./styles";

import { UserContext } from "../../App";

type Props = {};

export default function ProfileCard({}: Props) {
  const { user } = useContext(UserContext);

  return (
    <s.ProfileCardContainer>
      <s.ProfileCardHeader>
        <s.ProfileCardHeaderTitle>Hello! {user?.name}</s.ProfileCardHeaderTitle>
      </s.ProfileCardHeader>
      <s.ProfileCardBody></s.ProfileCardBody>
    </s.ProfileCardContainer>
  );
}
