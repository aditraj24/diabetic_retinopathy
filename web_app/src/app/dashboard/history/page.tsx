"use client";

import { useState } from "react";
import { useHistory } from "@/hooks/useHistory";
import { PageHeader } from "@/components/layout/PageHeader";
import { HistoryFilters } from "@/components/history/HistoryFilters";
import { HistoryGrid } from "@/components/history/HistoryGrid";
import { Pagination } from "@/components/history/Pagination";
import { EmptyState } from "@/components/history/EmptyState";
import { useDebounce } from "@/hooks/useDebounce";

export default function HistoryPage() {
  const [page, setPage] = useState(1);
  const [gradeFilter, setGradeFilter] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 500);

  const { analyses, total, totalPages, isLoading, isError } = useHistory(
    page, 
    12, 
    gradeFilter, 
    debouncedSearch
  );

  const handleGradeChange = (grade: string) => {
    setGradeFilter(grade);
    setPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchInput(query);
    setPage(1);
  };

  return (
    <>
      <PageHeader 
        title="Saved Results" 
        subtitle="Review your past retinal screenings and clinical recommendations."
      />

      <HistoryFilters 
        currentGrade={gradeFilter}
        onGradeChange={handleGradeChange}
        searchQuery={searchInput}
        onSearchChange={handleSearchChange}
      />

      {isError ? (
        <EmptyState 
          title="Error Loading History"
          description="Failed to retrieve the analysis history. Please refresh to try again."
        />
      ) : (!isLoading && analyses.length === 0) ? (
        <div className="mt-8">
          <EmptyState 
            title={debouncedSearch || gradeFilter !== "all" ? "No matches found" : "No saved analyses yet"}
            description={debouncedSearch || gradeFilter !== "all" 
              ? "Try adjusting your search criteria to find what you're looking for." 
              : "Go to the dashboard to analyse your first image and save it here."}
            actionLabel={(!debouncedSearch && gradeFilter === "all") ? "Go to Dashboard" : "Clear Filters"}
            actionHref={(!debouncedSearch && gradeFilter === "all") ? "/dashboard" : undefined}
          />
        </div>
      ) : (
        <>
          <HistoryGrid analyses={analyses} isLoading={isLoading} />
          
          <div className="mt-6">
            <Pagination 
              currentPage={page}
              totalPages={totalPages}
              totalItems={total}
              itemsPerPage={12}
              onPageChange={setPage}
            />
          </div>
        </>
      )}
    </>
  );
}