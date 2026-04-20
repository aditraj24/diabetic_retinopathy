import { useState } from "react";
import { AnalysisResult } from "@/types";

export function useAnalysis() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalysing, setIsAnalysing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleFileSelect = (selectedFile: File) => {
    setError(null);
    if (!selectedFile.type.startsWith("image/jpeg") && !selectedFile.type.startsWith("image/png")) {
      setError("Invalid file type. Only JPEG and PNG are supported.");
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File too large. Max size is 10MB.");
      return;
    }

    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    setResult(null);
    setIsSaved(false);
  };

  const handleAnalyse = async () => {
    if (!file) {
      setError("No file selected.");
      return;
    }

    setIsAnalysing(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      setResult({
        grade: data.grade,
        confidence: data.confidence,
        allScores: data.allScores,
        cloudinaryUrl: data.cloudinaryUrl,
        cloudinaryPublicId: data.cloudinaryPublicId,
      });
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during analysis.");
    } finally {
      setIsAnalysing(false);
    }
  };

  const handleSave = async (notes: string, onSaveSuccess?: () => void) => {
    if (!result) return;
    
    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch("/api/analyses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cloudinaryUrl: result.cloudinaryUrl,
          cloudinaryPublicId: result.cloudinaryPublicId,
          grade: result.grade,
          confidence: result.confidence,
          allScores: result.allScores,
          notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save result.");
      }

      setIsSaved(true);
      if (onSaveSuccess) onSaveSuccess();
    } catch (err: any) {
      setError(err.message || "Failed to save analysis.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    setResult(null);
    setIsAnalysing(false);
    setIsSaving(false);
    setError(null);
    setIsSaved(false);
  };

  return {
    file,
    preview,
    result,
    isAnalysing,
    isSaving,
    error,
    isSaved,
    handleFileSelect,
    handleAnalyse,
    handleSave,
    handleReset,
  };
}
