import mongoose from "mongoose";
import { ProductItem } from "@project-webbshop/shared";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true, lowercase: true },
  weight: { type: String, required: true },
  price: { type: String, required: true },
  manufacturer: { type: String, required: true },
  images: { type: Array, required: true, default: [] }
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
  try {
    const products = await Product.find();
    return products;
  } catch (err) {
    throw new Error(err as string);
  }
};

export const loadProductById = async (
  id: string
): Promise<ProductItem | null> => {
  try {
    const product = await Product.findById(id);
    return product;
  } catch (err) {
    throw new Error(err as string);
  }
};

export const loadProductsByCategory = async (
  category: string
): Promise<ProductItem[]> => {
  try {
    const products = await Product.find({ category });
    return products;
  } catch (err) {
    throw new Error(err as string);
  }
};

export const handleNewProduct = async (
  product: ProductItem
): Promise<ProductItem> => {
  try {
    const newProduct = await Product.create(product);
    return newProduct;
  } catch (err) {
    throw new Error(err as string);
  }
};

export const handleUpdateProduct = async (
  id: string,
  product: ProductItem
): Promise<ProductItem | null> => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    return updatedProduct;
  } catch (err) {
    throw new Error(err as string);
  }
};

export const handleDeleteProduct = async (id: string): Promise<void> => {
  try {
    await Product.findByIdAndDelete(id);
  } catch (err) {
    throw new Error(err as string);
  }
};

export const searchProducts = async (
  search: string
): Promise<ProductItem[]> => {
  try {
    const products = await Product.find({
      $text: { $search: search },
    });
    return products;
  } catch (err) {
    throw new Error(err as string);
  }
};
