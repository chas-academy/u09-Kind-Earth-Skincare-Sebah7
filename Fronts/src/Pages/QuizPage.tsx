import React, { useState } from "react";
import QuestionComponent from "../components/Quiz/QuizOption";
import NextButtonComponent from "../components/Quiz/NextBackbtn";
import RecommendationComponent from "../components/Quiz/QuizResult";
import { UserAnswer, ProductRecommendation } from "./../../../Backs/src/interfaces/IRoutine";
import routineImage from "../assets/routine.jpg";
import questions from "../components/Quiz/QuizQuitions";
import ProgressBar from "../components/Quiz/QuizProgress";
import axiosInstance from "../utils/axiosInstance";

const QuizPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [quizFinished, setQuizFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [recommendations, setRecommendations] = useState<ProductRecommendation[]>([]);
const [mainConcern, setMainConcern] = useState<string>("");

  const handleNext = async () => {

    const currentQuestion = questions[currentStep];
    const selectedOptionObject = currentQuestion.options.find(option => option.id === selectedOption);

    if (selectedOptionObject) {
      setUserAnswers(prevAnswers => {
        const existingAnswerIndex = 
        prevAnswers.findIndex(answer => answer.questionId === currentQuestion.id);
        const newAnswer = { questionId: currentQuestion.id, 
          selectedOption: { id: selectedOptionObject.id, 
          text: selectedOptionObject.label, value: selectedOptionObject.label } };

       if (existingAnswerIndex !== -1) {
          const updatedAnswers = [...prevAnswers];
          updatedAnswers[existingAnswerIndex] = newAnswer;
          return updatedAnswers;
        } else {
          return [...prevAnswers, newAnswer];
        }
      });

      if (currentQuestion.id === "skinConcern") {
        setMainConcern(selectedOptionObject.label);
      }
    }

    if (currentStep === questions.length - 1 
      && selectedOptionObject
    ) {
  setMainConcern(selectedOptionObject.label);
}
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setQuizFinished(true);
      await submitAnswers();
    }
    setSelectedOption("");
    console.log(userAnswers);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setUserAnswers(prevAnswers => prevAnswers.slice(0, -1));
    }
  };

  const submitAnswers = async () => {
    try {
      const response = await axiosInstance.post("/routine/routine-match", { answers: userAnswers });
      setRecommendations(response.data);
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  return (
    <>
    <div className=" flex flex-col md:flex-row rounded-lg border-solid border-clayAsh px-1 py-1 mt-10">
      <div className="flex-1 hidden md:flex">
        <img
          src={routineImage}
          alt=""
          className="object-cover w-full h-full rounded-l-md"
        />
      </div>

    <div className="flex-1 flex flex-grow flex-col items-center gap-y-3 rounded-r-md px-2 bg-glass backdrop-blur-glass">
<div className="w-full h-full mx-w-xs m-4">
      <ProgressBar totalSteps={questions.length} currentStep={currentStep} />
        {!quizFinished ? (
      <>
          <QuestionComponent
            theQuestion={questions[currentStep].theQuestion}
            options={questions[currentStep].options}
            selectedOption={selectedOption}
            onSelectOption={handleOptionSelect}
          />
          <NextButtonComponent onNext={handleNext} onBack={handleBack} disabled={!selectedOption} />
        </>
      ) : (
        <RecommendationComponent
          mainConcern={mainConcern}
          products={recommendations.map(rec => ({ name: rec.productName, category: rec.reason }))}
          onAddToRoutine={() => alert("Products added to routine")}
        />
      )}
    </div>
      </div>
    </div>
    
    </>
    
  );
};

export default QuizPage;
