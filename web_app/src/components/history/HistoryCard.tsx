import Link from "next/link";
import Image from "next/image";
import { SavedAnalysis } from "@/types";
import { GradeBadge } from "../analysis/GradeBadge";

export function HistoryCard({ analysis }: { analysis: SavedAnalysis }) {
  const dateStr = new Date(analysis.savedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/dashboard/history/${analysis._id}`} className="block group">
      <div className="glass-card overflow-hidden transition-all duration-300 group-hover:shadow-glow group-hover:scale-[1.02] group-hover:border-white/20">
        
        <div className="relative w-full aspect-square bg-navy">
          <Image
            src={analysis.cloudinaryUrl}
            alt="Retinal image"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-3 left-3">
            <GradeBadge grade={analysis.grade} size="sm" />
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-white">
              {(analysis.confidence * 100).toFixed(1)}% Confidence
            </h4>
            <span className="text-xs text-muted">{dateStr}</span>
          </div>
          
          {analysis.notes ? (
            <p className="text-sm text-muted line-clamp-2">
              {analysis.notes}
            </p>
          ) : (
            <p className="text-sm text-white/20 italic">No notes provided</p>
          )}
        </div>
      </div>
    </Link>
  );
}
