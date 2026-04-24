import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const startValue = (currentPage - 1) * itemsPerPage + 1;
  const endValue = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-white px-6 py-4 mt-8 rounded-2xl border border-gray-100 shadow-sm">
      <div className="hidden sm:block">
        <p className="text-sm text-gray-500 font-medium">
          Showing <span className="font-bold text-gray-900">{startValue}</span> to <span className="font-bold text-gray-900">{endValue}</span> of{" "}
          <span className="font-bold text-gray-900">{totalItems}</span> results
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="gap-1.5 shadow-sm text-gray-700 font-semibold"
        >
          <ChevronLeft size={16} />
          Previous
        </Button>

        <span className="text-sm font-semibold text-gray-500 px-3 flex items-center justify-center min-w-[5rem]">
          Page <span className="text-[#0D6B6B] mx-1">{currentPage}</span> of <span className="text-gray-900 ml-1">{totalPages}</span>
        </span>

        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="gap-1.5 shadow-sm text-gray-700 font-semibold"
        >
          Next
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}
