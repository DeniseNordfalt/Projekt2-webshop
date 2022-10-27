import React from "react";
import AdminView from "../components/AdminView";

type Props = {};

export default function Admin({}: Props) {
  return (
    <>
        <div>
          <h2>Admin</h2>
          <AdminView />
        </div>
    </>
  );
}
