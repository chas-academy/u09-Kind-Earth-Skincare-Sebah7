import React from "react";

interface Option {
  id: string;
  label: string;
}

interface QuestionProps {
  theQuestion: string;
  options: Option[];
  selectedOption: string;
  onSelectOption: (optionId: string) => void;
}

const QuestionComponent: React.FC<QuestionProps> = ({
   theQuestion, options, selectedOption, onSelectOption 
  }) => {
    
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-formPrimaryText">
        {theQuestion}</h2>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option.id} className="flex items-center space-x-2">
            <input
              type="radio"
              value={option.id}
              checked={selectedOption === option.id}
              onChange={() => onSelectOption(option.id)}
              className="h-5 w-5"
            />
            <span className="text-formPrimaryText">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuestionComponent;
