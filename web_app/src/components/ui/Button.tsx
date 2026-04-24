import React, { ButtonHTMLAttributes } from "react";
import { Spinner } from "./Spinner";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export function Button({ variant = "primary", size = "md", isLoading = false, className = "", children, disabled, ...props }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-navy";
  
  const variants = {
    primary: "btn-gradient hover:shadow-glow focus:ring-neon-blue",
    secondary: "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20 focus:ring-cyan",
    danger: "bg-red-500/20 text-red-400 border border-red-500/20 hover:bg-red-500/30 focus:ring-red-500",
    ghost: "bg-transparent text-muted hover:bg-white/5 hover:text-white focus:ring-white/20"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  const selectedVariant = variants[variant] || variants.primary;
  const selectedSize = sizes[size] || sizes.md;
  const disabledStyles = (disabled || isLoading) ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      className={`${baseStyles} ${selectedVariant} ${selectedSize} ${disabledStyles} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Spinner size="sm" className="mr-2" color="currentColor" />}
      {children}
    </button>
  );
}
