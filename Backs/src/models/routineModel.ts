import mongoose, { Schema, Document } from "mongoose";

const QuizOptionSchema: Schema = new Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
  value: { type: String, required: true },
});

const QuizQuestionSchema: Schema = new Schema({
  id: { type: String, required: true },
  questionText: { type: String, required: true },
  options: [QuizOptionSchema],
});

const UserAnswerSchema: Schema = new Schema({
  questionId: { type: String, required: true },
  selectedOption: QuizOptionSchema,
});

const ProductRecommendationSchema: Schema = new Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  reason: { type: String, required: true },
});

const RoutineRecommendationResultSchema: Schema = new Schema({
  userId: { type: String, required: true },
  recommendedProducts: [ProductRecommendationSchema],
});

const RoutineMatcherSchema: Schema = new Schema({
  questions: [QuizQuestionSchema],
  userAnswers: [UserAnswerSchema],
  result: RoutineRecommendationResultSchema,
});

export const RoutineMatcherModel = mongoose.model(
  "RoutineMatcher",
  RoutineMatcherSchema
);
