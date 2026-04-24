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
    <div className="flex flex-col sm:flex-row items-center justify-between glass-card px-6 py-4 mt-6">
      <div className="hidden sm:block">
        <p className="text-sm text-muted">
          Showing <span className="font-medium text-white">{startValue}</span> to <span className="font-medium text-white">{endValue}</span> of{" "}
          <span className="font-medium text-white">{totalItems}</span> results
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="gap-1"
        >
          <ChevronLeft size={14} />
          Previous
        </Button>

        <span className="text-sm font-medium text-muted px-4">
          Page <span className="text-white">{currentPage}</span> of <span className="text-white">{totalPages}</span>
        </span>

        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="gap-1"
        >
          Next
          <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  );
}
