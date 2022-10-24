import React, { useState } from "react";
import { registerUser } from "../api";

export default function RegisterUser() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [adress, setadress] = useState("");
  const [phone, setphone] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await registerUser(name, email, password, phone, adress);
    console.log(data);
  };

  return (
    <div>
      <div>RegisterUser</div>

      <div>
        <h3>Register</h3>
        <form onSubmit={handleRegister}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            onChange={(e) => setname(e.target.value)}
          />
          <label>Email</label>
          <input
            type="text"
            name="email"
            onChange={(e) => setemail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setpassword(e.target.value)}
          />

          <label>Phone number</label>
          <input
            type="text"
            name="phonenumber"
            onChange={(e) => setphone(e.target.value)}
          />

          <label>Delivery Adress</label>
          <input
            type="text"
            name="adress"
            onChange={(e) => setadress(e.target.value)}
          />

          <button>Register</button>
        </form>
      </div>
    </div>
  );
}
