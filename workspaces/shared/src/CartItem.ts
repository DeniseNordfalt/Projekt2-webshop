export type CartProduct = {
    productId: string,
    quantity: string
} 

export interface CartItem {
    _id?: string,
    userId: string,
    products: CartProduct[]
    createdAt?: Date
    updatedAt?: Date
    
  
}
