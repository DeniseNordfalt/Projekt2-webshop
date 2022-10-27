import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { findUserById, verifyUser } from "../models/User";
import { TokenPayload } from "@project-webbshop/shared";
import { JwtRequest } from "../app";
import { getUser } from "./users";
import { findOrderById } from "../models/Order";

export const requireLogin = (req: JwtRequest<TokenPayload>, res: Response, next: NextFunction) => {
  req.user ? next() : res.status(401).json({ error: "Unauthorized" });
};

export const logInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await verifyUser(email, password);

    if (user) {
      const token = jwt.sign(
        { userId: user._id, email: user.email, roles: user.roles },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h", subject: email }
      );
      res.status(200).json({ token, user });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (err) {
    console.error("ERROR: ", err);
    res.json({ error: "User not found" });
  }
};

export const newToken = async (req: JwtRequest<TokenPayload>, res: Response) => {
  const user = await findUserById(req.user?.userId as string)

  try {
    const token = jwt.sign(
      { userId: user?._id, email: user?.email, roles: user?.roles },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h", subject: user?.email }
    );
    res.status(200).json({ token, user });

  } catch (err) {
    res.status(401).json({ error: err })
  }


}
