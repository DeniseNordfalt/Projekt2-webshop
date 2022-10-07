import express, { Application, json, Request, Response } from "express";
import cors from "cors";
import indexRouter from "./routes/index";

const app: Application = express();
const port: number = parseInt('process.env.SERVER_PORT') || 3001;

app.use(cors());
app.use(json());

app.use("/", indexRouter)

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
