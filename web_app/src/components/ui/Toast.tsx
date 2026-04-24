"use client";

import { useToast } from "@/hooks/useToast";
import { X } from "lucide-react";

export function Toast() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4 pointer-events-none w-full max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto w-full overflow-hidden rounded-xl glass-card border-l-4 p-4 animate-fade-in-up ${
            toast.type === "success" ? "border-l-success-green" :
            toast.type === "error" ? "border-l-red-500" : "border-l-neon-blue"
          }`}
        >
          <div className="flex-1 min-w-0 flex items-start justify-between">
            <p className="text-sm font-medium text-white">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 flex-shrink-0 inline-flex rounded-md text-muted hover:text-white focus:outline-none transition-colors"
            >
              <span className="sr-only">Close</span>
              <X size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
