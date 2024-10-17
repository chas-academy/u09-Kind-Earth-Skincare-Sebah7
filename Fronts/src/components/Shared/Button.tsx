import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset"; 
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, type = "button", onClick, disabled }) => {
  return (
    <button
type={type} 
onClick={onClick} 
disabled={disabled}    
 className={`font-sans text-center text-[32px] leading-none 
  tracking-[0px] text-white flex w-full items-center justify-center 
  rounded-lg border-none
  bg-clayAsh
  px-14 py-[7.3px] transition duration-200 
  ease-in-out hover:bg-formPrimaryText 
  hover:scale-105 active:scale-95 active:gb-neutral-700
   ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {text}
    </button>
  );
};

export default Button;
