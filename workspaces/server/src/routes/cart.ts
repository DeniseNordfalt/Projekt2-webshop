import express, { Router } from 'express';
import { changeCartItem, createBuy, createCart, deleteCart, deleteCartItem, getAllCartItems, getCart } from '../controllers/cart';


const router: Router = express.Router();

router.get("/", getCart)
router.post("/", createCart)
// router.post("/", addToCart)
router.patch("/", deleteCartItem)
router.delete("/", deleteCart)
router.get("/purchase", createBuy)
router.patch("/admin", changeCartItem)
router.get("/admin", getAllCartItems)


export default router