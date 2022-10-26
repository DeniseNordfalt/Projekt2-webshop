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
import { TokenPayload } from "@project-webbshop/shared";
import multer from "multer";

dotenv.config();

const app: Application = express();
const port: number = parseInt(process.env.SERVER_PORT || "4000");
const mongoUrl: string = process.env.MONGODB_URL || "";

app.use(cors());
app.use(json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
app.use(upload.array("files"));
app.use("/uploads", express.static("./uploads"));

export interface JwtRequest<T> extends Request<T> {
  user?: TokenPayload;
}

app.use(
  async (req: JwtRequest<TokenPayload>, res: Response, next: NextFunction) => {
    const authHeader = req.header("Authorization");
    if (authHeader && authHeader.split(" ")[0] === "Bearer") {
      const token = authHeader.split(" ")[1];
      try {
        req.user = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as TokenPayload;
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
    console.info("connection to database successful");
  } catch (err) {
    console.info("could not connect to database");
  }
  console.info(`App is listening on port ${port}!`);
});
