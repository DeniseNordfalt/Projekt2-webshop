import express, { Router } from "express";
import {
  getProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsBySearch,
} from "../controllers/products";

const router: Router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.get("/id/:id", getProductById);
router.patch("/id/:id", updateProduct);
router.delete("/id/:id", deleteProduct);
router.get("/category/:category", getProductsByCategory);
router.get("/search/:search", getProductsBySearch);

export default router;
