import { SavedAnalysis } from "@/types";
import { HistoryCard } from "./HistoryCard";
import { Skeleton } from "@/components/ui/Skeleton";

export function HistoryGrid({ analyses, isLoading }: { analyses: SavedAnalysis[]; isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-2 shadow-sm">
            <Skeleton className="w-full aspect-square rounded-lg mb-4" />
            <div className="px-2 pb-2">
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {analyses.map((analysis) => (
        <HistoryCard key={analysis._id} analysis={analysis} />
      ))}
    </div>
  );
}
