import React from "react";
import Button from "../Shared/Button";

interface NextButtonProps {
  onNext: () => void;
  onBack?: () => void;
  disabled?: boolean;
}

const NextButtonComponent: React.FC<NextButtonProps> = ({ onNext, onBack, disabled}) => {
  return (
    
    <>
   <div className="flex flex-row">
    <div className="w-1/3 m-1">
        <Button type="button"
        text="Back"
        onClick={onBack}
        />
        </div>
<div className="w-1/3 m-1">
        <Button type="button"
        text="Next"
        onClick={onNext} disabled={disabled}
        />
        </div>
   </div>
    

    </>
   
  );
};

export default NextButtonComponent;
