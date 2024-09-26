import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductByQuery,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import { auth, admin } from "../middlewares/authMiddleware";

const productRouter = express.Router();

productRouter.post("/", auth, admin, createProduct);
productRouter.get("/", getAllProducts);
productRouter.get("/query", getProductByQuery);
productRouter.put("/products/:id", auth, admin, updateProduct);
productRouter.delete("/products/:id", auth, admin, deleteProduct);

export default productRouter;
