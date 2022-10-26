import mongoose from "mongoose";
import { CartItem } from "@project-webbshop/shared";

const shoppingCartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ]
}, { timestamps: true });

const ShoppingCart = mongoose.model<CartItem>(
  "ShoppingCart",
  shoppingCartSchema
);

//admin
export const getAllCarts = async (): Promise<CartItem[]> => {
  return await ShoppingCart.find({}).exec();
};

//customer && admin
export const createShoppingCart = async (cartItem: CartItem): Promise<void> => {
  await ShoppingCart.create(cartItem);
};


export const getShoppingCart = async (
  userId: string | undefined
): Promise<CartItem> => {

  const cart = await ShoppingCart.findOne({ userId: userId }).exec() as unknown as CartItem;

  return cart
};


export const addProductToCart = async (userId: string, product: string): Promise<void> => {
  await ShoppingCart.updateOne({ userId }, { $push: { products: product } })
}
export const deleteProductFromCart = async (userId: string, product: string): Promise<void> => {
  console.log(product)
  await ShoppingCart.updateOne({ userId: userId }, { $pull: { products: { productId: [product] } } })
}
export const updateQuantityInCart = async (userId: string, reqProduct: string, product: number): Promise<void> => {
  await ShoppingCart.updateOne({ userId: userId, 'products.productId': reqProduct }, { $set: { 'products.$.quantity': product } })
}

export const deleteCart = async (userId: string): Promise<void> => {
  await ShoppingCart.deleteOne({ userId: userId })
}
