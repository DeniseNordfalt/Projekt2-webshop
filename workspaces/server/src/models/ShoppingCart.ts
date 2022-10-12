import mongoose from "mongoose";
import { CartItem, ProductItem } from '@project-webbshop/shared'



const ShoppingCart = new mongoose.Schema({
    user: { type: String, required: true },
    product: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true, lowecase: true },
    weight: { type: String, required: true },
    price: { type: String, required: true },
    manufacturer: { type: String, required: true },
    images: [
        { type: String, required: true }
    ],
    paid: { type: Boolean, default: false, required: true }

})

const ShoppingCartModel = mongoose.model<CartItem>('ShoppingCart', ShoppingCart)


//admin

export const loadAllBuys = async (): Promise<CartItem[]> => {
    return await ShoppingCartModel.find({ paid: true }).exec()
}

//customer && admin 

export const createShoppingCart = async (cartItem: CartItem): Promise<void> => {
    await ShoppingCartModel.create(cartItem)
}
export const createPurchase = async (userId: string): Promise<void> => {
    await ShoppingCartModel.updateMany({ user: userId, paid: false }, { paid: true })
}

export const deleteShoppingCartItem = async (userId: string, product: string): Promise<void> => {
    await ShoppingCartModel.deleteOne({ user: userId, product: product })
}


export const getShoppingCart = async (userId: string | undefined): Promise<CartItem[]> => {
    return await ShoppingCartModel.find({ user: userId, paid: false })
}
export const getPurchases = async (userId: string): Promise<CartItem[]> => {
    return await ShoppingCartModel.find({ user: userId, paid: true })
}


