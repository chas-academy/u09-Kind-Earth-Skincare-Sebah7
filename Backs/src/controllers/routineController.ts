import { Request, Response } from "express";
import Product from "../models/productModel";
import { UserAnswer, ProductRecommendation } from "../interfaces/IRoutine";
import User from "../models/userModel";
import { RoutineMatcherModel } from "../models/routineModel";
import { CustomRequest } from "../middlewares/authMiddleware";

const generateProductRecommendations = async (
  userAnswers: UserAnswer[]
): Promise<ProductRecommendation[]> => {
  const recommendedProducts: ProductRecommendation[] = [];

  const filters: any = {};

  userAnswers.forEach((answer) => {
    switch (answer.questionId) {
      case "skinType":
        filters.skinTypes = answer.selectedOption.id;
        break;
      case "skinConcern":
        filters.skinConcerns = answer.selectedOption.id;
        break;
      case "category":
        filters.categories = answer.selectedOption.id;
        break;
      case "criteria":
        filters.criteria = answer.selectedOption.id;
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

export const getRoutines = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = req.user._id;
    const user = await User.findById(userId).populate("routines");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ routines: user.routines });
  } catch (error) {
    console.error("Error fetching routines:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteRoutine = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { routineId } = req.params;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.routines = user.routines.filter(
      (routine) => routine.toString() !== routineId
    );
    await user.save();

    await RoutineMatcherModel.findByIdAndDelete(routineId);

    res.status(200).json({ message: "Routine deleted successfully" });
  } catch (error) {
    console.error("Error deleting routine:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const renameRoutine = async (req: CustomRequest, res: Response) => {
  try {
    const { routineId } = req.params;
    const { newName } = req.body;

    const routine = await RoutineMatcherModel.findById(routineId);
    if (!routine) {
      return res.status(404).json({ message: "Routine not found" });
    }

    routine.name = newName;
    await routine.save();

    res.status(200).json({ message: "Routine renamed successfully", routine });
  } catch (error) {
    console.error("Error renaming routine:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
