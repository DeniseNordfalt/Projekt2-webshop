import { TokenPayload, UserItem } from "@project-webbshop/shared";
import { Request, Response } from "express";
import { JwtRequest } from "../app";
import { loadProductById } from "../models/Product";
import { changeCartStatus, createPurchase, createShoppingCart, deleteAllCart, deleteShoppingCartItem, getAllCarts, getShoppingCart } from "../models/ShoppingCart";



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





    try {
        const product = await loadProductById(req.body.productId);

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
    } catch (err) {
        console.error(err)
        res.status(404).json({ message: err })
    }


}

export const deteleCartItem = async (req: JwtRequest<any>, res: Response) => {
    const cartItem = req.body.cartId
    const userId = req.user?.userId as string

    try {
        await deleteShoppingCartItem(userId, cartItem)
        res.json({ message: 'Cart-item Deleted' })
    } catch (err) {
        console.error(err)
        res.status(404).json({ message: err })
    }

}
export const deleteCart = async (req: JwtRequest<any>, res: Response) => {
    const userId = req.user?.userId as string

    try {
        await deleteAllCart(userId)
        res.json({ message: 'Cart deleted' })
    } catch (err) {
        console.error(err)
        res.status(404).json({ message: err })
    }

}
export const createBuy = async (req: JwtRequest<any>, res: Response) => {
    const userId = req.user?.userId as string

    try {
        await createPurchase(userId)
        res.json({ message: 'Purchase made!' })
    } catch (err) {
        console.error(err)
        res.status(404).json({ message: err })
    }
}
export const changeCartItem = async (req: JwtRequest<any>, res: Response) => {
    const isAdmin = req.user?.roles.includes('admin')
    const cartItem = req.body.cartId as string


    if (isAdmin) {
        try {
            await changeCartStatus(cartItem)
            res.json('Order Changed')
        } catch (err) {
            console.error(err)
            res.status(404).json({ message: err })

        }
    } else {
        res.status(401).json('Unauthorized')
    }
}
export const getAllCartItems = async (req: JwtRequest<any>, res: Response) => {
    const isAdmin = req.user?.roles.includes('admin')



    if (isAdmin) {
        try {
            const cartItems = await getAllCarts()
            res.json(cartItems)
        } catch (err) {
            console.error(err)
            res.status(404).json({ message: err })

        }
    } else {
        res.status(401).json('Unauthorized')
    }
}














