import React, { useState } from "react";

import styled from "styled-components";

import ProfileCard from "../components/ProfileCard";
import EditUser from "../components/EditUser";

type Props = {};

export default function ProfilePage({}: Props) {
  const [edit, setEdit] = useState(false);

  return (
    <>
      {!edit ? (
        <>
          <ProfileCard />
          <button onClick={() => setEdit(true)}> Edit Profile </button>
        </>
      ) : (
        <EditUser />
      )}
    </>
  );
}
