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
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-200 group-hover:shadow-md group-hover:scale-[1.02]">
        
        <div className="relative w-full aspect-square bg-gray-100">
          <Image
            src={analysis.cloudinaryUrl}
            alt="Retinal image"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-3 left-3">
            <GradeBadge grade={analysis.grade} size="sm" />
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-gray-900">
              {(analysis.confidence * 100).toFixed(1)}% Confidence
            </h4>
            <span className="text-xs text-gray-500">{dateStr}</span>
          </div>
          
          {analysis.notes ? (
            <p className="text-sm text-gray-600 line-clamp-2">
              {analysis.notes}
            </p>
          ) : (
            <p className="text-sm text-gray-400 italic">No notes provided</p>
          )}
        </div>
      </div>
    </Link>
  );
}
