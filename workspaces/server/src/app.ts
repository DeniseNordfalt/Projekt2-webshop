import express, {
  Application,
  json,
  NextFunction,
  Request,
  Response,
} from "express";
import cors from "cors";
import dotenv from "dotenv";
import indexRouter from "./routes/index";
import { setupMongoDb } from "./config/common";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { TokenPayload } from "@project-webbshop/shared";

dotenv.config();

const app: Application = express();
const port: number = parseInt(process.env.SERVER_PORT || "4000");
const mongoUrl: string = process.env.MONGODB_URL || "";

app.use(cors());
app.use(json());
app.use(cookieParser());

export interface JwtRequest<T> extends Request<T> {
  user?: TokenPayload;
}

app.use(
  async (req: JwtRequest<TokenPayload>, res: Response, next: NextFunction) => {
    // const token = req.cookies.access_token;
    const authHeader = req.header("Authorization");
    if (authHeader && authHeader.split(" ")[0] === "Bearer") {
      const token = authHeader.split(" ")[1];
      try {
        req.user = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as TokenPayload;
        console.log("TOKEN IS OK");
      } catch (err) {
        if (err instanceof JsonWebTokenError) {
          console.error(err);
          err.message === "Invalid token" &&
            res.status(400).json({ error: "Invalid token" });
        }
      }
    }
    next();
  }
);

app.use("/", indexRouter);

app.listen(port, async function () {
  try {
    await setupMongoDb(mongoUrl);
    console.log("connection to database successful");
  } catch (err) {
    console.log("could not connect to database");
  }
  console.log(`App is listening on port ${port}!`);
});
