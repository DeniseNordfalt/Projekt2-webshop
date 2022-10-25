import React, { useContext, useEffect } from "react";
import * as s from "./styles";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../App";

type Props = {};

export default function ProfileCard({}: Props) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/user");
    }
  }, [user, navigate]);

  return (
    <>
      <s.ProfileCardContainer>
        <s.ProfileCardHeader>
          <s.HeaderTitle>Hello {user?.name}!</s.HeaderTitle>
        </s.ProfileCardHeader>
        <s.ProfileCardBody>
          <s.BodyTitle>User info</s.BodyTitle>
          <s.Separator />
          <s.ProfileCardBodyText>
            <s.TextItem>
              <s.TextItemTitle>Username:</s.TextItemTitle>
              <s.TextItemValue>{user?.name}</s.TextItemValue>
            </s.TextItem>
            <s.TextItem>
              <s.TextItemTitle>Email:</s.TextItemTitle>
              <s.TextItemValue>{user?.email}</s.TextItemValue>
            </s.TextItem>

            <s.TextItem>
              <s.TextItemTitle>Phone:</s.TextItemTitle>
              <s.TextItemValue>{user?.phoneNumber}</s.TextItemValue>
            </s.TextItem>

            <s.BodyTitle>Address</s.BodyTitle>
            <s.Separator />
            <s.TextItem>
              <s.TextItemTitle>Street name:</s.TextItemTitle>
              <s.TextItemValue>
                {user?.deliveryAddress?.streetName}
              </s.TextItemValue>
            </s.TextItem>

            <s.TextItem>
              <s.TextItemTitle>Street number:</s.TextItemTitle>
              <s.TextItemValue>
                {user?.deliveryAddress?.streetNumber}
              </s.TextItemValue>
            </s.TextItem>

            <s.TextItem>
              <s.TextItemTitle>Postal code:</s.TextItemTitle>
              <s.TextItemValue>
                {user?.deliveryAddress?.postalCode}
              </s.TextItemValue>
            </s.TextItem>

            <s.TextItem>
              <s.TextItemTitle>County:</s.TextItemTitle>
              <s.TextItemValue>{user?.deliveryAddress?.county}</s.TextItemValue>
            </s.TextItem>
          </s.ProfileCardBodyText>
        </s.ProfileCardBody>
      </s.ProfileCardContainer>
    </>
  );
}
