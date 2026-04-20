import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-16 w-full bg-white border-b border-gray-200 mb-8" />
      
      <div className="mb-8">
         <Skeleton className="h-6 w-32 mb-4" />
         <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200">
           <Skeleton className="h-8 w-64" />
           <Skeleton className="h-6 w-32" />
         </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <Skeleton className="w-full aspect-square rounded-xl" />
        </div>
        
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Skeleton className="h-24 w-48 rounded-xl" />
            <Skeleton className="h-6 w-32" />
          </div>
          
          <div className="space-y-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
          </div>
          
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
