import { TokenPayload, UserItem } from "@project-webbshop/shared";
import { Request, Response } from "express";
import { JwtRequest } from "../app";
import { findUserById, handleNewUser, updateUser } from "../models/User";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, phoneNumber, role, deliveryAddress } =
    req.body;
  // TODO: check required fields
  try {
    const user = await handleNewUser(req.body);
    console.log("USER", user);
  } catch (err) {
    console.error("ERR", err);
    res.status(409).json({ error: "User already exists" });
  }
  res.json({ message: "User created!" });
};

export const getUser = async (req: JwtRequest<TokenPayload>, res: Response) => {
  const id = req?.user?.userId;
  if (id) {
    const user = await findUserById(id);
    res.json(user);
  } else {
    res.json({ error: "User not found" });
  }
};

export const editUser = async (
  req: JwtRequest<TokenPayload>,
  res: Response
) => {
  const body = req.body;
  const editables = ["name", "email", "phoneNumber", "deliveryAddress"];
  let edits: Partial<UserItem> = {};

  editables.forEach((item) => {
    if (body.hasOwnProperty(item)) {
      if (item === "deliveryAddress") {
        const adressEditables = [
          "streetName",
          "streetNumber",
          "county",
          "postalCode",
        ];

        adressEditables.forEach((adressItem) => {
          if (body[item].hasOwnProperty(adressItem)) {
            edits[item as keyof UserItem][adressItem] =
              body[item][adressItem];
          }
        });
      } else {
        edits[item as keyof UserItem] = body[item];
      }
    }
  });

  // { username: req.user.username },
  // {
  //   $set: {
  //     firstname: user.firstname,
  //     lastname: user.lastname,
  //     email: user.email,
  //     image,
  //     settings: {
  //       name: user.setting_name,
  //       email: user.setting_email,
  //     },
  //   },
  // }
  res.json({ message: "edit user" });
};
