import React, { TextareaHTMLAttributes, forwardRef } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const defaultId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col space-y-1.5">
        {label && (
          <label htmlFor={defaultId} className="text-sm font-bold text-primary">
            {label}
          </label>
        )}
        <textarea
          id={defaultId}
          ref={ref}
          className={`w-full rounded-xl border ${error ? 'border-red-400 focus:ring-red-200 focus:border-red-500' : 'border-gray-200 focus:ring-teal/20 focus:border-teal hover:border-gray-300'} bg-white px-4 py-2.5 text-sm text-primary font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all resize-y ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
