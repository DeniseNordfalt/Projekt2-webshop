import mongoose from "mongoose";
import { ProductItem } from "@project-webbshop/shared";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true, lowercase: true },
  weight: { type: String, required: true },
  price: { type: String, required: true },
  manufacturer: { type: String, required: true },
  images: { type: Array, required: true, default: [] },
});

productSchema.index({
  name: "text",
  description: "text",
  category: "text",
  weight: "text",
  price: "text",
  manufacturer: "text",
});

const Product = mongoose.model<ProductItem>("products", productSchema);

export const loadAllProducts = async (): Promise<ProductItem[]> => {
  const products = await Product.find();
  return products;
};

export const loadProductById = async (
  id: string
): Promise<ProductItem | null> => {
  const product = await Product.findById(id);
  return product;
};

export const loadProductsByCategory = async (
  category: string
): Promise<ProductItem[]> => {
  const products = await Product.find({ category });
  return products;
};

export const handleNewProduct = async (
  product: ProductItem
): Promise<ProductItem> => {
  const newProduct = await Product.create(product);
  return newProduct;
};

export const handleUpdateProduct = async (
  id: string,
  product: ProductItem
): Promise<ProductItem | null> => {
  const updatedProduct = await Product.findByIdAndUpdate(id, product, {
    new: true,
  });
  return updatedProduct;
};

export const handleDeleteProduct = async (id: string): Promise<void> => {
  await Product.findByIdAndDelete(id);
};

export const searchProducts = async (
  search: string
): Promise<ProductItem[]> => {
  const products = await Product.find({
    $text: { $search: search },
  });
  return products;
};
