import React, { useRef } from 'react';
import { useTheme } from '@/context/ThemeContext'; // Adjust the import path as necessary

interface InputProps {
  className?: string;
  label?: string | React.ReactNode;
  id?: string;
  placeholder?: string;
  autoComplete?: string;
  type?: string;
  name?: string;
  value?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  resize?: boolean;
  onChange?: (e: any) => void;
}

const Input: React.FC<InputProps> = ({
  className,
  label,
  id,
  placeholder,
  autoComplete,
  type,
  name,
  value,
  disabled = false,
  autoFocus,
  ...rest
}) => {
  const { theme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      inputRef.current?.form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };

  const themeClass = theme === 'dark' ? 'bg-dark/20' : 'bg-white/20';
  const textThemeClass = theme === 'dark' ? 'text-white/40' : 'text-black/40';

  return (
    <div className={` rounded-[20px] w-full max-w-[620px] px-[22px] pb-4 pt-1 shadow-sm ring-inset ${themeClass} ${className || ''}`}>
      <label htmlFor={id} className={`block text-xs ${textThemeClass}`}>
        {label}
      </label>
      <input
        ref={inputRef}
        id={id}
        name={name}
        type={type}
        className={`block w-full border-0 p-0 placeholder-gray-400 focus:ring-0 sm:text-sm sm:leading-6 bg-transparent`}
        placeholder={placeholder}
        value={value}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        {...rest}
      />
    </div>
  );
};

export default Input;
