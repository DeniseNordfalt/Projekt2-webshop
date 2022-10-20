import express, { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
} from "../controllers/products";

const router: Router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.get("/:id", getProductById);

export default router;
