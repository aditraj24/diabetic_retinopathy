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
      <div className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100/80 shadow-sm flex flex-col h-full">
        
        <div className="relative w-full aspect-square bg-gray-50/50">
          <Image
            src={analysis.cloudinaryUrl}
            alt="Retinal image"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-3 left-3">
            <GradeBadge grade={analysis.grade} size="sm" />
          </div>
        </div>
        
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-bold text-gray-900 flex items-center gap-1.5">
              {(analysis.confidence * 100).toFixed(1)}% Confidence
            </h4>
            <span className="text-xs font-semibold text-gray-500 bg-gray-100/80 px-2 py-1 rounded-md">{dateStr}</span>
          </div>
          
          {analysis.notes ? (
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
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
