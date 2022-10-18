import express, { Router, Request, response } from "express";
import { createUser } from '../controllers/users'

const router: Router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "You have reached users!" })
})

router.post("/", createUser)

export default router;