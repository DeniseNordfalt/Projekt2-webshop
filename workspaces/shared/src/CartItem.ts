export interface CartItem {
    _id?: string,
    user: string,
    product: string,
    description: string,
    category: string,
    weight: string,
    price: string,
    manufacturer: string,
    images: string[]
    paid?: boolean
}
