import { TokenPayload, UserItem } from "@project-webbshop/shared";
import { Request, Response } from "express";
import { JwtRequest } from "../app";
import { loadProductById } from "../models/Product";
import { getAllPurchases, getPurchases } from "../models/ShoppingCart";


export const getOrders = async (req: JwtRequest<any>, res: Response) => {
    const userId = req.user?.userId as string

    try {
        const orders = await getPurchases(userId)
        res.json(orders)
    } catch (err) {
        console.error(err)
        res.status(404).json({ message: err })
    }

}
export const getAllOrders = async (req: JwtRequest<any>, res: Response) => {

    const isAdmin = req.user?.roles.includes('admin')
    if (isAdmin) {
        try {
            const orders = await getAllPurchases()
            res.json(orders)
        } catch (err) {
            console.error(err)
            res.status(404).json({ message: err })
        }

    } else {
        res.status(401).json('Unauthorized')
    }




}


