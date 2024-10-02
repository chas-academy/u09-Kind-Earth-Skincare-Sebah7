import React from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({ 
  // label, 
  type, 
  value, 
  id, 
  onChange,
  placeholder,
  autoComplete,
}) => {
  return (
      <div className="w-full mt-7">
        <input
        type={type}
        value={value}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="font-sans appearance-none border
         border-black h-11 w-full max-w-full py-2 px-0 
         text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
      </div>  
  );
};

export default InputField;
