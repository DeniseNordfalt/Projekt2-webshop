type OrderProduct = {
    productId: string
    manufacturer: string
    name: string
    price: string
    image: string
    quantity: number
}

type Adress = {
    streetName: string;
    streetNumber: number;
    county: string;
    postalCode: number;
  };
  

export interface OrderItem {
    _id: string
    userId: string
    paid: boolean
    shippingCost: string
    totalCost: string
    deliveryAddress: Adress
    status: "registrerad" | "behandlas" | "under leverans" | "levererad"
    products: OrderProduct[]
    createdAt: string
    updatedAt: string
}