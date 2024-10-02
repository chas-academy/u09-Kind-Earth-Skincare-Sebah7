// src/index.js
import express, { Express, Request, Response } from "express";
import cors from "cors";

import authRouter from "./routes/userRoutes";
import productRouter from "./routes/productRoutes";
import path from "path";

const app: Express = express();

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/users", authRouter);
app.use("/api/products", productRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

export default app;
