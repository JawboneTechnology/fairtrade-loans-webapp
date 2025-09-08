import React, { useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface FloatingLabelInputProps {
  id: string;
  name?: string;
  type?: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  error?: string | null;
  isPassword?: boolean;
}

const FloatingInput: React.FC<FloatingLabelInputProps> = ({
  id,
  name,
  type = "text",
  label,
  value,
  onChange,
  required = false,
  className = "",
  error = "",
  isPassword = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const isLabelFloating = isFocused || value.length > 0;
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="">
      <div className={`relative ${className}`}>
        <input
          id={id}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent peer pr-10"
          autoComplete="off"
        />
        <label
          htmlFor={id}
          className={`absolute font-normal left-3 transition-all duration-200 ease-in-out pointer-events-none ${
            isLabelFloating
              ? "text-sm -top-3.5 bg-white px-1 text-primary"
              : "top-3.5 text-gray-300"
          } peer-focus:text-sm peer-focus:-top-2.5 peer-focus:bg-white peer-focus:px-1 peer-focus:text-primary`}
        >
          {label}
        </label>

        {isPassword && (
          <button
            type="button"
            className="absolute right-3 top-4 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <FaEyeSlash className="text-primary/50 text-xl" />
            ) : (
              <FaEye className="text-primary/50 text-xl" />
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm flex items-center gap-2">
          <BsExclamationCircle /> {error}
        </p>
      )}
    </div>
  );
};

export default FloatingInput;
