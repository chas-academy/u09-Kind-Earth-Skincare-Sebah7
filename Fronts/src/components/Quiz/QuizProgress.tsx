import React from "react";

interface ProgressBarProps {
  totalSteps: number;
  currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ totalSteps, currentStep }) => {
  return (
    <div className="flex justify-center mb-4">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`w-5 h-5 rounded-full mx-1 ${
            index < currentStep ? "bg-formPrimaryText" : "bg-gray-300"
          }`}
        ></div>
      ))}
    </div>
  );
};

export default ProgressBar;