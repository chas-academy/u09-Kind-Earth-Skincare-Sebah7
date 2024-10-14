import { Request, Response } from "express";
import Product from "../models/productModel";
import { UserAnswer, ProductRecommendation } from "../interfaces/IRoutine";

const generateProductRecommendations = async (
  userAnswers: UserAnswer[]
): Promise<ProductRecommendation[]> => {
  const recommendedProducts: ProductRecommendation[] = [];

  const filters: any = {};

  userAnswers.forEach((answer) => {
    switch (answer.questionId) {
      case "skinType":
        filters.skinTypes = answer.selectedOption.value;
        break;
      case "skinConcern":
        filters.skinConcerns = answer.selectedOption.value;
        break;
      case "category":
        filters.categories = answer.selectedOption.value;
        break;
      case "criteria":
        filters.criteria = answer.selectedOption.value;
        break;
      default:
        break;
    }
  });

  const categoriesToRecommend = ["cleanser", "serum", "moisturizer"];

  for (const category of categoriesToRecommend) {
    const categoryFilters = { ...filters, categories: category };
    const products = await Product.find(categoryFilters).limit(1);

    products.forEach((product) => {
      recommendedProducts.push({
        productId: product._id.toString(),
        productName: product.name,
        reason: `This ${category} is recommended for your ${
          filters.skinTypes || ""
        } skin type and ${filters.skinConcerns || ""} concern.`,
      });
    });
  }

  return recommendedProducts;
};

export const routineMatchController = async (req: Request, res: Response) => {
  try {
    const { answers } = req.body;

    const matchedProducts = await generateProductRecommendations(answers);

    res.status(200).json(matchedProducts);
  } catch (error) {
    console.error("Error generating product recommendations:", error);
    res
      .status(500)
      .json({ message: "Failed to generate product recommendations", error });
  }
};
