import { Request, Response } from "express";
import { JwtRequest } from "../app";
import {
  createOrder,
  findAllOrders,
  findOrderById,
  findOrdersByUser,
  updateOrder,
} from "../models/Order";
import { OrderItem, ProductItem, TokenPayload } from "@project-webbshop/shared";
import { loadProductById } from "../models/Product";
import { deleteCart } from "../models/ShoppingCart";

export const handleNewOrder = async (
  req: JwtRequest<TokenPayload>,
  res: Response
) => {
  const body = req.body;
  let order: Partial<OrderItem> = {};
  order.userId = req.user?.userId as string;
  order.totalCost = "0";
  for (const key in body) {
    if (key === "products") {
      order.products = [];
      for (const item of body[key]) {
        let product: ProductItem | null = null;
        try {
          product = await loadProductById(item.productId);
        } catch (err) {
          if (err instanceof Error) {
            console.error(err);
            res.status(500).json({ error: err.message });
          }
        }
        if (product) {
          const { _id, manufacturer, name, price, images } = product;
          order.products?.push({
            productId: _id || "",
            manufacturer,
            name,
            price,
            image: images[0].filename || "",
            quantity: item.quantity,
          });
          order.totalCost = `${parseInt(order.totalCost || "0") +
            parseInt(product.price.replace(/\D+/g, "")) * item.quantity
            } kr`;
        }
      }
    } else if (key === "shippingCost") {
      order.totalCost = `${parseInt(order.totalCost || "0") +
        parseInt(body[key].replace(/\D+/g, ""))
        } kr`;
      order[key as keyof OrderItem] = body[key];
    } else {
      order[key as keyof OrderItem] = body[key];
    }
  }

  try {
    const newOrder = await createOrder(order as OrderItem);
    res.json(newOrder);
    await deleteCart(req.user?.userId)
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }
};

export const getUserOrders = async (req: JwtRequest<any>, res: Response) => {
  const userId = req.user?.userId as string;
  let orders: OrderItem[] = [];
  try {
    orders = await findOrdersByUser(userId);
  } catch (err) {
    if (err instanceof Error) {
      res.json({ error: err.message });
    }
  }
  res.json(orders);
};

export const getAllOrders = async (req: JwtRequest<any>, res: Response) => {
  const isAdmin = req.user?.roles.includes("admin");
  if (isAdmin) {
    try {
      const orders = await findAllOrders();
      res.json(orders);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        res.status(404).json({ error: err.message });
      }
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export const editOrder = async (req: JwtRequest<any>, res: Response) => {
  let updatedOrder: OrderItem | null = null;
  const isAdmin = req.user?.roles.includes("admin");
  if (isAdmin) {
    try {
      updatedOrder = await updateOrder(req.params.id, req.body);
    } catch (err) {
      if (err instanceof Error) {
        res.json({ error: err.message });
      }
    }
  }
  updatedOrder ? res.json(updatedOrder) : res.json({ message: "No update made" });
};

export const handleOrderStatusChange = async (
  req: JwtRequest<any>,
  res: Response
) => {
  const isAdmin = req.user?.roles.includes("admin");
  const status = req.body.status;
  const isCorrectStatus = status === "registrerad" || status === "behandlas" || status === "under leverans" || status === "levererad";
  let updatedStatus = null;
  if (isAdmin && isCorrectStatus) {
    try {
      updatedStatus = await updateOrder(req.params?.id, { status });
    } catch (err) {
      if (err instanceof Error) {
        res.json({ error: err.message });
      }
    }
  }
  updatedStatus?.modifiedCount > 0 ? res.json({ message: "Status updated" }) : res.json({ message: "Nothing updated" });
}
