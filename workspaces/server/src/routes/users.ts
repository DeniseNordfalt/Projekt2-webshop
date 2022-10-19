import express, { Router, Request, response } from "express";
import { requireLogin } from "../controllers/auth";
import { createUser, getUser, editUser } from "../controllers/users";

const router: Router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "You have reached users!" });
});

router.post("/", createUser);
router.get("/me", requireLogin, getUser);
router.patch("/me", requireLogin, editUser);

export default router;
