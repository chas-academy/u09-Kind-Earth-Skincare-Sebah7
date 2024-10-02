export interface IProduct extends Document {
  name: string;
  productImageUrl?: string;
  description: string;
  categories: Array<
    | "cleanser"
    | "moisturizer"
    | "serum"
    | "toner"
    | "mask"
    | "exfoliator"
    | "sunscreen"
    | "eye cream"
    | "lip care"
    | "treatment"
  >;
  criteria: Array<
    "clean" | "vegan" | "cruelty-free" | "BDS-approved" | "Not-in-BDS-list"
  >;
  skinTypes: Array<"dry" | "oily" | "combination" | "sensitive" | "normal">;
  skinConcerns: Array<
    | "acne"
    | "aging"
    | "dark spots"
    | "dryness"
    | "oiliness"
    | "pores"
    | "redness"
    | "sensitivity"
  >;
  ingredients: string[];
  rating?: number;
  // reviews?: Review[];
}
