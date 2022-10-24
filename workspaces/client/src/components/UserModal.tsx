import React, { useState, useContext } from "react";

import { LoginUser } from "./LoginUser";
import RegisterUser from "./RegisterUser";

type Props = {};

export default function UserModal({}: Props) {
  return (
    <>
      <div>
        <LoginUser />

        <RegisterUser />
      </div>
    </>
  );
}
