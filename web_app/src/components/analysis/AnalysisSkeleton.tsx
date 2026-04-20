import { Skeleton } from "@/components/ui/Skeleton";

export function AnalysisSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 max-w-xl mx-auto w-full">
      <div className="flex flex-col items-center justify-center space-y-4 mb-8">
        <Skeleton className="h-40 w-full max-w-[280px] rounded-2xl" />
        <Skeleton className="h-6 w-32" />
      </div>

      <div className="space-y-3 mb-8">
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-3 w-full rounded-full" />
        <Skeleton className="h-3 w-full rounded-full" />
        <Skeleton className="h-3 w-full rounded-full" />
        <Skeleton className="h-3 w-full rounded-full" />
        <Skeleton className="h-3 w-full rounded-full" />
      </div>

      <div className="mt-8 rounded-lg border border-gray-100 p-4">
        <Skeleton className="h-5 w-48 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}
