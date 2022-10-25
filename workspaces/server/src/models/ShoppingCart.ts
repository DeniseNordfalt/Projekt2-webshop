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
}, {timestamps: true});

const ShoppingCart = mongoose.model<CartItem>(
  "ShoppingCart",
  shoppingCartSchema
);

//admin
export const getAllCarts = async (): Promise<CartItem[]> => {
  return await ShoppingCart.find({ paid: false }).exec();
};

//customer && admin
export const createShoppingCart = async (cartItem: CartItem): Promise<void> => {
  await ShoppingCart.create(cartItem);
};
export const createPurchase = async (userId: string): Promise<void> => {
  await ShoppingCart.updateMany(
    { user: userId, paid: false },
    { paid: true }
  );
};
export const deleteAllCart = async (userId: string): Promise<void> => {
  await ShoppingCart.deleteMany({ user: userId, paid: false });
};

export const deleteShoppingCartItem = async (
  userId: string,
  id: string
): Promise<void> => {
  await ShoppingCart.deleteOne({ user: userId, products: {productId: id} });
};
export const changeOrder = async (cartId: string): Promise<void> => {
  await ShoppingCart.updateOne({ _id: cartId }, { paid: false });
};
export const changeCartStatus = async (cartId: string): Promise<void> => {
  await ShoppingCart.updateOne({ _id: cartId }, { paid: true });
};

export const getShoppingCart = async (
  userId: string | undefined
): Promise<CartItem > => {

  return await ShoppingCart.find({ userId: userId }).exec() as unknown as CartItem;
};
export const getPurchases = async (userId: string): Promise<CartItem[]> => {
  return await ShoppingCart.find({ user: userId, paid: true }).exec();
};
export const getAllPurchases = async (): Promise<CartItem[]> => {
  return await ShoppingCart.find({ paid: true }).exec();
};

export const upDateCart = async (userId: string, product: string): Promise<void> => {
     await ShoppingCart.updateOne({userId}, {$push: {products: product}})
}
