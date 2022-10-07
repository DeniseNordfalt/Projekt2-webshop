import express, {Router} from 'express';
import { logInUser } from '../controllers/auth';

const router: Router = express.Router();

router.post("/", logInUser)

export default router