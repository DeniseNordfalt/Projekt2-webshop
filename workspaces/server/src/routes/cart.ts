import express, { Router } from 'express';
import { createBuy, createCart, deleteCart, deteleCartItem, getCart } from '../controllers/cart';


const router: Router = express.Router();

router.get("/", getCart)
router.post("/", createCart)
router.patch("/", deteleCartItem)
router.delete("/", deleteCart)
router.patch("/purchase", createBuy)


export default router