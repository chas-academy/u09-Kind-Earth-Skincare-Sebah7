import { Response } from "express";
import Product from "../models/productModel";
import { IProduct } from "../interfaces/IProduct";
import { CustomRequest } from "../middlewares/authMiddleware";

const create = async (data: IProduct) => {
  await Product.create(data);
};

const fetchByQuery = async (query: any) => {
  return await Product.find(query);
};

const fetchAll = async () => {
  const products = await Product.find({}).exec();
  return products;
};

const fetch = async (id: any) => {
  const product = await Product.findById(id).populate("_id").exec();

  if (!product) {
    return null;
  }

  return {
    ...product.toObject(),
  };
};

const update = async (id: any, data: IProduct) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

const remove = async (id: any) => {
  return await Product.findByIdAndDelete(id);
};

export const createProduct = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authorization Required" });
    }

    const newProduct: IProduct = {
      ...req.body,
      user_id: req.user._id as string,
    };
    console.log("New Product:", newProduct);

    const savedProduct = await create(newProduct);
    res
      .status(201)
      .json({ message: "Product created successfully", savedProduct });
  } catch (error) {
    console.log("Error creating Product:", error);
    res.status(500).json({ message: "Product not created", error });
  }
  console.log("Request body:", req.body);
};

export const getAllProducts = async (req: any, res: any): Promise<void> => {
  try {
    const products = await fetchAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "No products found" });
  }
};

export const getProductByQuery = async (req: any, res: any): Promise<void> => {
  try {
    const { categories, criteria, skinTypes, skinConcerns, name } = req.query;

    let query: { [key: string]: any } = {};

    if (categories) {
      query.categories = categories;
    }

    if (criteria) {
      query.criteria = criteria;
    }

    if (skinTypes) {
      query.skinTypes = skinTypes;
    }

    if (skinConcerns) {
      query.skinConcerns = skinConcerns;
    }

    if (name) {
      query.name = { $regex: new RegExp(name, "i") };
    }

    console.log("Received Query Params:", query);

    const products = await fetchByQuery(query);

    console.log(query);

    if (products.length === 0) {
      res
        .status(404)
        .json({ message: "No products found matching your query.", query });
    } else {
      res.status(200).json({ products, query });
    }
  } catch (error) {
    res.status(500).json({ message: `Failed to retrieve products: ${error}` });
  }
};

export const getEnumValues = async (req: any, res: any): Promise<void> => {
  try {
    const enums = {
      categories: [
        "cleanser",
        "moisturizer",
        "serum",
        "toner",
        "mask",
        "exfoliator",
        "sunscreen",
        "eye cream",
        "lip care",
        "treatment",
      ],
      criteria: [
        "clean",
        "vegan",
        "cruelty-free",
        "BDS-approved",
        "Not-in-BDS-list",
      ],
      skinTypes: ["dry", "oily", "combination", "sensitive", "normal"],
      skinConcerns: [
        "acne",
        "aging",
        "dark spots",
        "dryness",
        "oiliness",
        "pores",
        "redness",
        "sensitivity",
      ],
    };
    res.status(200).json(enums);
  } catch (error) {
    res.status(500).json({ message: `Failed to retrieve enums: ${error}` });
  }
};

export const getProductById = async (req: any, res: any) => {
  try {
    const id = req.params.id;
    const product = await fetch(id);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Product not found" });
  }
};

export const updateProduct = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authorization Required" });
    }

    const id = req.params.id;
    const updatedProductData = req.body;

    if (!updatedProductData) {
      return res.status(404).json({ error: "Product not found" });
    }

    const updatedProduct = await update(id, updatedProductData);

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.log("Error updating product:", error);
    res.status(500).json({ message: "Error updating product", error });
  }
};

export const deleteProduct = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authorization Required" });
    }

    const id = req.params.id;

    const deletedProduct = await remove(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product", error });
  }
};
