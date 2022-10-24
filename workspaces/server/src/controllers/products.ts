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
  try {
    const product = await loadProductById(req.params.id);
    res.json(product);
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
  console.log(req.params.search);
  const search = req.params.search;
  try {
    const products = await searchProducts(search);
    if (products.length > 0) {
      res.json(products);

    } else {
      res.json({ error: "No products found" });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
