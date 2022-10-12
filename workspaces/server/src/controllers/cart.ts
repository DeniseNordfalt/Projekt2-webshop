import { TokenPayload, UserItem } from "@project-webbshop/shared";
import { Request, Response } from "express";
import { JwtRequest } from "../app";
import { getShoppingCart } from "../models/ShoppingCart";



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




