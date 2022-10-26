import { ProductItem } from "./ProductItem"

export type CartProduct = {
    productId: string,
    quantity: string
}

export interface CartItem {
    _id?: string,
    userId: string,
    products: Partial<CartProduct[] & ProductItem[]>[]
    createdAt?: Date
    updatedAt?: Date


}
