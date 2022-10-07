import express, { Application, json, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import indexRouter from "./routes/index";
import { setupMongoDb } from "./config/common";

dotenv.config();

const app: Application = express();
const port: number = parseInt(process.env.SERVER_PORT || "3001");
const mongoUrl: string = process.env.MONGODB_URL || "";

app.use(cors());
app.use(json());

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
