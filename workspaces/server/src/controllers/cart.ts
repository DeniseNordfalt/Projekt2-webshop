import { ProductItem, TokenPayload, UserItem } from "@project-webbshop/shared";
import { Response } from "express";

import { JwtRequest } from "../app";
import { loadProductById } from "../models/Product";

import {

  addProductToCart,
  createShoppingCart,
  deleteProductFromCart,
  getAllCarts,
  getShoppingCart,
  updateQuantityInCart,
} from "../models/ShoppingCart";

export const getCart = async (req: JwtRequest<TokenPayload>, res: Response) => {
  const user = req.user?.userId;


  try {
    const cart = await getShoppingCart(user) as any;
    let products = []
    for (const item of cart.products) {

      products.push({ ...(await loadProductById(item.productId) as any)?.toObject(), quantity: item.quantity })

    }




    res.json({ ...cart.toObject(), products });
  } catch (err) {
    console.error("ERR", err);
    res.status(400).json({ error: "Cant load shoppingcart" });
  }
};




export const createCart = async (req: JwtRequest<any>, res: Response) => {
  const user = req.user?.userId as string;
  const cart = await getShoppingCart(user)

  const cartProduct = cart?.products || []
  const changeQuantity = req.body.changeQuantity

  const productExistsInCart = cartProduct?.find(item => item?.productId === req.body.productId)

  try {

    if (!cart) {
      const cartItem = {
        userId: user,
        products: [{
          productId: req.body.productId,
          quantity: changeQuantity
        }]
      }
      console.log(cartItem)
      await createShoppingCart(cartItem)
      res.json({ message: 'new cart added' })
    } else if (cart as any && productExistsInCart) {
      const cartProducts = productExistsInCart.quantity + changeQuantity


      await updateQuantityInCart(user, req.body.productId, cartProducts as any)
      res.json({ message: 'quantity added' })
    } else if (cart as any && !productExistsInCart) {
      const cartProducts = {
        productId: req.body.productId,
        quantity: 1
      }

      await addProductToCart(user, cartProducts as any)
      res.json({ message: 'new product added' })
    } else {
      res.json("You suck!")
    }


  } catch (err) {

    console.error(err);
    res.status(404).json({ message: err });

  }



};

export const deleteCartItem = async (req: JwtRequest<any>, res: Response) => {
  const productId = req.body.productId
  const user = req.user?.userId as string;
  const changeQuantity = req.body.changeQuantity
  console.log("delete", productId, changeQuantity, user)
  const cart = await getShoppingCart(user)

  const cartProduct = cart?.products

  const productExistsInCart = cartProduct?.filter(item => item.productId == productId)
  console.log(productExistsInCart)

  try {
    if (productExistsInCart[0].quantity as any > 1) {
      const cartProducts = productExistsInCart[0].quantity + changeQuantity


      await updateQuantityInCart(user, req.body.productId, cartProducts as any)
      res.json({ message: 'quantity minus' })
    } else if (productExistsInCart[0].quantity as any >= 1) {


      await deleteProductFromCart(user, productId)
      res.json('deleted')
    }

  } catch (err) {
    console.error(err);
    res.status(404).json({ message: err });
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
