import Link from "next/link";
import { Button } from "@/components/ui/Button";
import React from "react";
import { Eye } from "lucide-react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({ icon, title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center glass-card w-full">
      <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 text-muted">
        {icon || <Eye className="w-10 h-10" />}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-muted max-w-sm mb-8">{description}</p>
      
      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button>{actionLabel}</Button>
        </Link>
      )}
    </div>
  );
}
