import { Skeleton } from "@/components/ui/Skeleton";

export function AnalysisSkeleton() {
  return (
    <div className="bg-white p-8 max-w-xl mx-auto w-full rounded-[24px] border border-gray-100 shadow-sm">
      <div className="flex flex-col items-center justify-center space-y-4 mb-10">
        <Skeleton className="h-44 w-full max-w-[280px] rounded-3xl" />
        <Skeleton className="h-7 w-40" />
      </div>

      <div className="space-y-4 mb-10 w-full px-2">
        <Skeleton className="h-5 w-32 mb-2" />
        <Skeleton className="h-3 w-full rounded-full" />
        <Skeleton className="h-3 w-full rounded-full" />
        <Skeleton className="h-3 w-11/12 rounded-full" />
        <Skeleton className="h-3 w-full rounded-full" />
        <Skeleton className="h-3 w-4/5 rounded-full" />
      </div>

      <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50/50 p-6 w-full">
        <Skeleton className="h-6 w-48 mb-4" />
        <Skeleton className="h-4 w-full mb-3" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}
