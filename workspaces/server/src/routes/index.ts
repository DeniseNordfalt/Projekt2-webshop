import express, { Request, Response, Router } from "express";
import userRoutes from "./users";
import authRoutes from "./auth";
import productRoutes from "./products";

const router: Router = express.Router();

router.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/products", productRoutes);

export default router;
