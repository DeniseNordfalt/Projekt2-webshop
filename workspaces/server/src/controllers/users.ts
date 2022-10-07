import { Request, Response } from "express";
import { handleNewUser } from "../models/User";


export const createUser = async (req: Request, res: Response) => {
    const { name, email, password, phoneNumber, role, deliveryAddress } = req.body;
    // TODO: check required fields
    try  {
        const user = await handleNewUser(req.body)
        console.log("USER", user)
    } catch(err) {
        console.error("ERR",err)
        res.status(409).json({error: "User already exists"})
    }
    res.json({message: "User created!"})
}