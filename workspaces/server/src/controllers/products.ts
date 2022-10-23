import { Request, Response } from "express";
import { ProductItem } from "@project-webbshop/shared";
import {
  loadAllProducts,
  loadProductById,
  loadProductsByCategory,
  handleNewProduct,
  handleUpdateProduct,
  handleDeleteProduct,
  searchProducts,
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
  const id = req.params.id;
  try {
    const product = await loadProductById(req.params.id);
    res.json(product);
  } catch (err: any) {
    // res.status(500).json({ error: err.message });
    res.status(404).json({ error: "Not a valid id" });
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

export const getProductsBySearch = async (req: Request, res: Response) => {
  const search = req.params.search;

  if (!search) {
    return res.status(400).json({ error: "No search term" });
  } else {
    try {
      const products = await searchProducts(search);
      res.json(products);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
};
