// src/index.js
import express, { Express, Request, Response } from "express";
import cors from "cors";

import authRouter from "./routes/userRoutes";
import productRouter from "./routes/productRoutes";
import contactRoutes from "./routes/contactRoutes";
import path from "path";
import RoutineRouter from "./routes/routineRoutes";

const app: Express = express();

const allowedOrigins = [
  "https://kindearthskincare.netlify.app",
  "http://localhost:5173",
];

const corsOptions = {
  origin: allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/users", authRouter);
app.use("/api/products", productRouter);
app.use("/api/contact", contactRoutes);
app.use("/api/routine", RoutineRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

export default app;
