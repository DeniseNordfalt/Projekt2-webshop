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
    res.json(products || []);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const product: ProductItem = req.body;
  product.images = (req.files as Express.Multer.File[]) || [];
  try {
    const newProduct = await handleNewProduct(product);
    res.json({ message: "Product created", newProduct });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const product = req.body;
  product.images = req.files || [];
  const id = req.params.id;
  if (product.images.length === 0) {
    delete product.images;
  }
  try {
    const updatedProduct = await handleUpdateProduct(id, product);
    res.json({ message: "Product updated", updatedProduct });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await handleDeleteProduct(id);
    res.json({ message: `${id} was deleted` });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getProductsBySearch = async (req: Request, res: Response) => {
  const search = req.params.search;
  try {
    const products = await searchProducts(search);
    if (products.length > 0) {
      res.json(products);
    } else {
      res.status(404).json({ error: "No products found" });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
