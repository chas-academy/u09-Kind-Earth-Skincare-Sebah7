// src/index.js
import express, { Express, Request, Response } from "express";
import authRouter from "./routes/userRoutes";

const app: Express = express();

app.use(express.json());
app.use('/api/users', authRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

export default app;