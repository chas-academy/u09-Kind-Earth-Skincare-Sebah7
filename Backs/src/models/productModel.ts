import mongoose, { Schema, model } from "mongoose";
import { IProduct } from "../interfaces/IProduct";

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  categories: [
    {
      type: String,
      enum: [
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
      required: true,
    },
  ],
  criteria: [
    {
      type: String,
      enum: [
        "clean",
        "vegan",
        "cruelty-free",
        "BDS-approved",
        "Not-in-BDS-list",
      ],
      required: true,
    },
  ],
  skinTypes: [
    {
      type: String,
      enum: ["dry", "oily", "combination", "sensitive", "normal"],
      required: true,
    },
  ],
  skinConcerns: [
    {
      type: String,
      enum: [
        "acne",
        "aging",
        "dark spots",
        "dryness",
        "oiliness",
        "pores",
        "redness",
        "sensitivity",
      ],
      required: true,
    },
  ],
  ingredients: [{ type: String }],
  rating: { type: Number },
  // reviews: [ReviewSchema],
});

const Product = model<IProduct>("Product", ProductSchema);

export default Product;
