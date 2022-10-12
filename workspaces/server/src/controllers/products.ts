import { Request, Response } from "express";
import { ProductItem } from "@project-webbshop/shared";
import { loadAllProducts } from "../models/Product";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await loadAllProducts();
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
