import React from 'react';

interface InputFieldProps {
  label?: string;
  type: string;
  value: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  autoComplete?: string;
  placeholder?: string;
  isTextArea?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ 
  // label, 
  type, 
  value, 
  id, 
  onChange,
  placeholder,
  autoComplete,
  isTextArea,
}) => {
  return (
      <div className="w-full mt-7">
        {!isTextArea ? (
        <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="font-sans appearance-none border
         border-black h-11 w-full max-w-full py-2 px-0 
         text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
         />
         ) : (
        <textarea
        value={value}
        onChange={onChange}
          id={id}
          placeholder={placeholder}
          className="font-sans appearance-none border border-black h-32 w-full max-w-full py-2 px-0 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
      )}
      </div>  
  );
};

export default InputField;
