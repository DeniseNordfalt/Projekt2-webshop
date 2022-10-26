
export interface ProductItem {
    _id?: string,
    name: string,
    description: string,
    category: string,
    weight: string,
    price: string,
    manufacturer: string,
    images: any[],
    quantity?: number,
    productId?: string
    totalPrice?: string
}
