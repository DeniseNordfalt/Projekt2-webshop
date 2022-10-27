import express, { Router } from 'express';
import { logInUser, newToken } from '../controllers/auth';

const router: Router = express.Router();

router.post("/", logInUser)
router.get("/", newToken)

export default router