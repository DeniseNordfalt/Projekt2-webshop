import express, { Router } from 'express';
import { changeOrderStatus, getAllOrders, getOrders } from '../controllers/orders';


const router: Router = express.Router();

router.get("/", getOrders)
router.get("/admin", getAllOrders)
router.patch("/admin", changeOrderStatus)




export default router