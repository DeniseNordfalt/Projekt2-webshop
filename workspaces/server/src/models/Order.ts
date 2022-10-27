import { OrderItem } from "@project-webbshop/shared";
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    shippingCost: { type: String, required: true, default: "5000 kr" },
    totalCost: { type: String, required: true },
    deliveryAddress: {
      streetName: { type: String, required: true },
      streetNumber: { type: String, required: true },
      county: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    status: { type: String, required: true, default: "registrerad" },
    products: { type: Array, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export const createOrder = async (order: OrderItem): Promise<any> => {
  return await Order.create(order);
};

export const findOrder = async (id: string): Promise<OrderItem> => {
  return (await Order.findById(id).exec()) as unknown as OrderItem;
};

export const findAllOrders = async (): Promise<OrderItem[]> => {
  return (await Order.find({}).sort({ createdAt: -1 }).exec()) as unknown as OrderItem[];
};

export const findOrderById = async (id: string): Promise<OrderItem> => {
  return (await Order.findById(id).exec()) as unknown as OrderItem;
}

export const findOrdersByUser = async (
  userId: string
): Promise<OrderItem[]> => {
  return (await Order.find({ userId }).sort({ createdAt: -1 }).exec()) as unknown as OrderItem[];
};

export const updateOrder = async (
  orderId: string,
  update: any
): Promise<any> => {
  return await Order.updateOne({ _id: orderId }, update);
};
