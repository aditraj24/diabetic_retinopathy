import React, { forwardRef } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-sm font-bold text-primary mb-1.5">{label}</label>}
        <input
          ref={ref}
          className={`w-full px-4 py-2.5 bg-white border rounded-xl text-primary font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all ${
            error 
              ? "border-red-400 focus:border-red-500 focus:ring-red-200" 
              : "border-gray-200 focus:border-teal focus:ring-teal/20 hover:border-gray-300"
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500 font-medium">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
