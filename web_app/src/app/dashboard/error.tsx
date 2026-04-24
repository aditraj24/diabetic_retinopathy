"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center glass-card mx-auto max-w-2xl mt-12">
      <div className="w-16 h-16 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-3">Something went wrong</h2>
      <p className="text-muted mb-8 max-w-md">
        {error.message || "An unexpected error occurred while loading this page."}
      </p>
      <Button onClick={() => reset()} size="lg" className="gap-2">
        <RotateCcw size={16} />
        Try again
      </Button>
    </div>
  );
}
