import express, { Router } from 'express';
import { createCart, getCart } from '../controllers/cart';


const router: Router = express.Router();

router.get("/", getCart)
router.post("/:id", createCart)

export default router