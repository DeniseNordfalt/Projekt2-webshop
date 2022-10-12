import express, { Router } from 'express';
import { getCart } from '../controllers/cart';


const router: Router = express.Router();

router.get("/", getCart)

export default router