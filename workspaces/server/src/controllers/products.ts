import { Request, Response } from "express";
import { ProductItem } from "@project-webbshop/shared";
import {
  loadAllProducts,
  loadProductById,
  loadProductsByCategory,
  handleNewProduct,
  handleUpdateProduct,
  handleDeleteProduct,
} from "../models/Product";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await loadAllProducts();
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await loadProductById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    const products = await loadProductsByCategory(req.params.category);
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const product: ProductItem = req.body;
  console.log(req.body);
  try {
    const newProduct = await handleNewProduct(product);
    res.json(newProduct);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const product: ProductItem = req.body;
  const id = req.params.id;
  try {
    const updatedProduct = await handleUpdateProduct(id, product);
    res.json(updatedProduct);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await handleDeleteProduct(id);
    res.json(`${id} was deleted`);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
