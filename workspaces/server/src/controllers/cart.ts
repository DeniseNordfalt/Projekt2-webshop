import { TokenPayload, UserItem } from "@project-webbshop/shared";
import { NextFunction, Request, Response } from "express";
import { JwtRequest } from "../app";
import { loadProductById } from "../models/Product";
import {
  changeCartStatus,
  createPurchase,
  createShoppingCart,
  deleteAllCart,
  deleteShoppingCartItem,
  getAllCarts,
  getShoppingCart,
  upDateCart,
} from "../models/ShoppingCart";

export const getCart = async (req: JwtRequest<TokenPayload>, res: Response) => {
  const user = req.user?.userId;

  try {
    const cart = await getShoppingCart(user);
    res.json(cart);
  } catch (err) {
    console.error("ERR", err);
    res.status(400).json({ error: "Cant load shoppingcart" });
  }
};


/*
updateCart()
if cart with userId does not exist createCart({}cart object)
routes.patch cart, create cart
function createCart() {
    //kolla om cart med userId finns
    //skapa om den inte finns
    next() // gå vidare
}
routes.patch cart, update cart
function() {
    // lägg till product i cart
}
*/
export const createCart = async (req: JwtRequest<any>, res: Response) => {
  const user = req.user?.userId as string;
  const cart = getShoppingCart(user)

  try {

    if (!cart) {
      const cartItem = {
                 userId: user,
                 products: [ {
                     productId: req.body.productId,
                     quantity: req.body.quantity,
                 }]}
       await createShoppingCart(cartItem)
      res.json({message: 'new cart added'})
    } if (cart as any){
       const cartProducts = {
          productId: req.body.productId,
          quantity: req.body.quantity
       }
  
      await upDateCart(user, cartProducts as any)
    } 
    
    
  } catch (err) {

    console.error(err);
    res.status(404).json({ message: err });
    
  }

  

};

export const deleteCartItem = async (req: JwtRequest<any>, res: Response) => {
  const productId = req.body.productId
  const userId = req.user?.userId as string;

  try {
    await deleteShoppingCartItem(userId, productId);
    res.json({ message: "Cart-item Deleted" });
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: err });
  }
};
export const deleteCart = async (req: JwtRequest<any>, res: Response) => {
  const userId = req.user?.userId as string;

  try {
    await deleteAllCart(userId);
    res.json({ message: "Cart deleted" });
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: err });
  }
};
export const createBuy = async (req: JwtRequest<any>, res: Response) => {
  const userId = req.user?.userId as string;

  try {
    await createPurchase(userId);
    res.json({ message: "Purchase made!" });
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: err });
  }
};
export const changeCartItem = async (req: JwtRequest<any>, res: Response) => {
  const isAdmin = req.user?.roles.includes("admin");
  const cartItem = req.body.cartId as string;

  if (isAdmin) {
    try {
      await changeCartStatus(cartItem);
      res.json("Order Changed");
    } catch (err) {
      console.error(err);
      res.status(404).json({ message: err });
    }
  } else {
    res.status(401).json("Unauthorized");
  }
};
export const getAllCartItems = async (req: JwtRequest<any>, res: Response) => {
  const isAdmin = req.user?.roles.includes("admin");

  if (isAdmin) {
    try {
      const cartItems = await getAllCarts();
      res.json(cartItems);
    } catch (err) {
      console.error(err);
      res.status(404).json({ message: err });
    }
  } else {
    res.status(401).json("Unauthorized");
  }
};
