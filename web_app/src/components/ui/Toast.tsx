"use client";

import { useToast } from "@/hooks/useToast";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

export function Toast() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  const icons = {
    success: <CheckCircle size={18} className="text-emerald-600 flex-shrink-0" />,
    error: <AlertCircle size={18} className="text-red-500 flex-shrink-0" />,
    info: <Info size={18} className="text-teal flex-shrink-0" />,
  };

  const borders = {
    success: "border-l-emerald-500",
    error: "border-l-red-500",
    info: "border-l-teal",
  };

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-3 pointer-events-none w-full max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto w-full overflow-hidden toast-card border-l-4 p-4 animate-slide-in-bottom ${borders[toast.type] || borders.info}`}
        >
          <div className="flex items-start gap-3">
            {icons[toast.type] || icons.info}
            <p className="flex-1 min-w-0 text-sm font-medium text-primary">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 rounded-md p-0.5 text-secondary hover:text-primary hover:bg-teal-mist focus-ring transition-colors"
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
