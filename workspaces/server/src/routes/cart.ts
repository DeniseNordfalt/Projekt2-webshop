import express, { Router } from "express";
import {
  createCart,
  deleteCartItem,
  getAllCartItems,
  getCart,
} from "../controllers/cart";

const router: Router = express.Router();

router.get("/", getCart);
router.post("/", createCart);
router.patch("/", deleteCartItem);

router.get("/admin", getAllCartItems);

export default router;
