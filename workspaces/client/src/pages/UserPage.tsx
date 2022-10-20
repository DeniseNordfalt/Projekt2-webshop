import React from "react";
import UserModal from "../components/UserModal";

type Props = {};

export default function UserPage({}: Props) {
  return (
    <div>
      <h2>User</h2>
      <UserModal />
    </div>
  );
}
