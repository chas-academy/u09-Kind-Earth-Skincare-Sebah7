import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`font-sans text-center text-[32px] leading-none tracking-[0px] text-white flex w-full items-center justify-center rounded-lg border border-solid border-neutral-800 bg-neutral-800 px-14 py-[7.3px] type="button"`}
    > 
      {text}
    </button>
  );
};

export default Button;
