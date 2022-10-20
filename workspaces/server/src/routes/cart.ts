import express, { Router } from 'express';
import { changeCartItem, createBuy, createCart, deleteCart, deteleCartItem, getAllCartItems, getCart } from '../controllers/cart';


const router: Router = express.Router();

router.get("/", getCart)
router.post("/", createCart)
router.patch("/", deteleCartItem)
router.delete("/", deleteCart)
router.patch("/purchase", createBuy)
router.patch("/admin", changeCartItem)
router.get("/admin", getAllCartItems)


export default router