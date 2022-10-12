import { TokenPayload, UserItem } from "@project-webbshop/shared";
import { Request, Response } from "express";
import { JwtRequest } from "../app";
import { loadProductById } from "../models/Product";
import { createShoppingCart, getShoppingCart } from "../models/ShoppingCart";



export const getCart = async (req: JwtRequest<TokenPayload>, res: Response) => {
    const user = req.user?.userId

    try {
        const cart = await getShoppingCart(user)
        res.json({ cart })
    } catch (err) {
        console.error("ERR", err)
        res.status(400).json({ error: "Cant load shoppingcart" })
    }



}

export const createCart = async (req: JwtRequest<any>, res: Response) => {
    const user = req.user?.userId as string
    const productId = req.params.id as string




    try {
        const product = await loadProductById(req.params.id);

        if (product) {
            const cartItem = {
                user: user,
                product: product.name,
                description: product.description,
                category: product.category,
                weight: product.weight,
                price: product.price,
                manufacturer: product.manufacturer,
                images: product.images


            }
            const addToCart = await createShoppingCart(cartItem)
            res.json({ addToCart })
        }
    } catch (error) {

    }








}











