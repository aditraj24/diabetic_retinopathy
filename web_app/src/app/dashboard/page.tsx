"use client";

import { useAnalysis } from "@/hooks/useAnalysis";
import { useToast } from "@/hooks/useToast";
import { PageHeader } from "@/components/layout/PageHeader";

import { ImageUploader } from "@/components/analysis/ImageUploader";
import { AnalyseButton } from "@/components/analysis/AnalyseButton";
import { ResultPanel } from "@/components/analysis/ResultPanel";
import { AnalysisSkeleton } from "@/components/analysis/AnalysisSkeleton";
import { EmptyState } from "@/components/history/EmptyState";

export default function DashboardPage() {
  const { 
    preview, 
    result, 
    isAnalysing, 
    isSaving, 
    error, 
    isSaved,
    handleFileSelect, 
    handleAnalyse, 
    handleSave 
  } = useAnalysis();

  const { addToast } = useToast();

  const onSave = (notes: string) => {
    handleSave(notes, () => addToast("Analysis saved to history successfully.", "success"));
  };

  return (
    <>

      
      <PageHeader 
        title="New Analysis" 
        subtitle="Upload a retinal fundus photograph for immediate AI screening evaluation."
      />

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <ImageUploader 
            onFileSelect={handleFileSelect} 
            previewUrl={preview} 
            error={error} 
          />
          
          {preview && !result && (
            <AnalyseButton onClick={handleAnalyse} isAnalysing={isAnalysing} disabled={isAnalysing} />
          )}
        </div>

        <div className="w-full lg:w-1/2">
          {isAnalysing ? (
            <AnalysisSkeleton />
          ) : result ? (
            <ResultPanel 
              result={result} 
              onSave={onSave}
              isSaving={isSaving}
              isSaved={isSaved}
            />
          ) : (
            <div className="h-full min-h-[360px] flex">
              <div className="w-full h-full flex self-stretch items-center">
                <EmptyState 
                  title="No Analysis Yet"
                  description="Upload a retinal image and click analyse to see the detailed evaluation results here."
                  icon={(
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
