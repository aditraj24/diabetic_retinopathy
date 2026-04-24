"use client";

import Image from "next/image";
import { useAnalysis } from "@/hooks/useAnalysis";
import { useToast } from "@/hooks/useToast";
import { PageHeader } from "@/components/layout/PageHeader";

import { ImageUploader } from "@/components/analysis/ImageUploader";
import { AnalyseButton } from "@/components/analysis/AnalyseButton";
import { ResultPanel } from "@/components/analysis/ResultPanel";

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
        subtitle="Upload a retinal fundus photograph for immediate DL screening evaluation."
      />

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2 flex flex-col gap-5">
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
            <div className="bg-white border border-gray-200 rounded-md p-8 flex flex-col items-center justify-center min-h-[400px] gap-5">
              <div className="relative w-40 h-40">
                <Image 
                  src="/RP-RI-1.gif" 
                  alt="Analysing retinal image..." 
                  fill 
                  className="object-contain" 
                  unoptimized
                />
              </div>
              <div className="text-center">
                <p className="text-gray-900 font-medium text-base">Analysing Retinal Image...</p>
                <p className="text-gray-500 text-xs mt-1">Running deep learning model inference</p>
              </div>
            </div>
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
                <div className="flex flex-col items-center justify-center p-8 text-center bg-white border border-gray-200 rounded-md w-full">
                  <div className="relative w-16 h-16 mb-4 opacity-20">
                    <Image 
                      src="/retinography.png" 
                      alt="Fundus example" 
                      fill 
                      className="object-contain" 
                    />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">No Analysis Yet</h3>
                  <p className="text-sm text-gray-500 max-w-sm">Upload a retinal image and click analyse to see the detailed evaluation results here.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}