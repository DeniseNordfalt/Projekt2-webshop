import React, { useContext, useState } from "react";

import { loginUser } from "../api";
import { UserContext } from "../App";

type Props = {};

export const LoginUser = (props: Props) => {
  const { user, setUser } = useContext(UserContext);

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await loginUser(email, password);
    setUser(data);
  };

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
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
        <button>Login</button>
      </form>
    </div>
  );
};
