import Link from "next/link";
import { Button } from "@/components/ui/Button";
import React from "react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({ icon, title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-16 text-center bg-white/50 backdrop-blur-sm rounded-[24px] border border-gray-100/50 w-full shadow-sm mt-4">
      <div className="w-24 h-24 bg-[#0D6B6B]/5 rounded-full flex items-center justify-center mb-6 text-[#0D6B6B]">
        {icon || <Inbox className="w-10 h-10" strokeWidth={1.5} />}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-500 font-medium max-w-sm mb-8 leading-relaxed">{description}</p>
      
      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button className="px-8 font-semibold shadow-md bg-[#0D6B6B] hover:bg-[#0a5252] text-white focus:ring-[#0D6B6B]/20">
            {actionLabel}
          </Button>
        </Link>
      )}
    </div>
  );
}
