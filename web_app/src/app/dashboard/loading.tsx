import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <>
      <div className="mb-8">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          <Skeleton className="w-full h-80 rounded-2xl" />
        </div>
        <div className="w-full lg:w-1/2">
          <Skeleton className="w-full h-96 rounded-2xl" />
        </div>
      </div>
    </>
  );
}
