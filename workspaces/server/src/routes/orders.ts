import express, { Router } from 'express';
import { getAllOrders, getOrders } from '../controllers/orders';


const router: Router = express.Router();

router.get("/", getOrders)
router.get("/admin", getAllOrders)




export default router