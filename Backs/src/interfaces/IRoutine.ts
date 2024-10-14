export interface QuizQuestion {
  id: string;
  questionText: string;
  options: QuizOption[];
}

export interface QuizOption {
  id: string;
  text: string;
  value: string;
}

export interface UserAnswer {
  questionId: string;
  selectedOption: QuizOption;
}

export interface ProductRecommendation {
  productId: string;
  productName: string;
  reason: string;
}

export interface RoutineRecommendationResult {
  userId: string;
  recommendedProducts: ProductRecommendation[];
}
