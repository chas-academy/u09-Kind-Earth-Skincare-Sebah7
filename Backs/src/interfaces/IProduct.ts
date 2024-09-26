export interface IProduct extends Document {
  name: string;
  productImageUrl?: string;
  description: string;
  categories:
    | "cleanser"
    | "moisturizer"
    | "serum"
    | "toner"
    | "mask"
    | "exfoliator"
    | "sunscreen"
    | "eye cream"
    | "lip care"
    | "treatment";
  criteria:
    | "clean"
    | "vegan"
    | "cruelty-free"
    | "BDS-approved"
    | "Not-in-BDS-list";
  skinTypes: "dry" | "oily" | "combination" | "sensitive" | "normal";
  skinConcerns:
    | "acne"
    | "aging"
    | "dark spots"
    | "dryness"
    | "oiliness"
    | "pores"
    | "redness"
    | "sensitivity";
  ingredients: string[];
  rating?: number;
  // reviews?: Review[];
}
