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
            <div className="white-card p-8 flex flex-col items-center justify-center min-h-[400px] gap-6">
              {/* Animated retinal processing GIF */}
              <div className="relative w-48 h-48 md:w-56 md:h-56">
                <Image 
                  src="/RP-RI-1.gif" 
                  alt="Analysing retinal image..." 
                  fill 
                  className="object-contain rounded-2xl" 
                  unoptimized
                />
              </div>
              <div className="text-center">
                <p className="text-teal font-bold text-lg animate-pulse">Analysing Retinal Image...</p>
                <p className="text-secondary text-sm mt-1 font-medium">Running deep learning model inference</p>
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
                <div className="flex flex-col items-center justify-center p-12 text-center white-card w-full">
                  {/* Retinography as visual guide */}
                  <div className="relative w-24 h-24 mb-6 opacity-30">
                    <Image 
                      src="/retinography.png" 
                      alt="Fundus example" 
                      fill 
                      className="object-contain rounded-full mix-blend-multiply" 
                    />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">No Analysis Yet</h3>
                  <p className="text-secondary font-medium max-w-sm">Upload a retinal image and click analyse to see the detailed evaluation results here.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
