import mongoose from "mongoose";
import { ProductItem } from "@project-webbshop/shared";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true, lowecase: true },
  weight: { type: String, required: true },
  price: { type: String, required: true },
  manufacturer: { type: String, required: true },
  images: [{ type: String, required: true }],
});

const productModel = mongoose.model<ProductItem>("products", productSchema);

export const loadAllProducts = async (): Promise<ProductItem[]> => {
  return await productModel.find({}).exec();
};

export const loadProductById = async (
  id: string
): Promise<ProductItem | null> => {
  return await productModel.findById(id).exec();
};
