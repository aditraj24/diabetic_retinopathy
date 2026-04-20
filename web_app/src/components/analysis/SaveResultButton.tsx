"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";

export function SaveResultButton({ 
  onSave, 
  isSaving, 
  isSaved 
}: { 
  onSave: (notes: string) => void;
  isSaving: boolean;
  isSaved: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [notes, setNotes] = useState("");

  if (isSaved) {
    return (
      <div className="mt-6 flex items-center justify-center p-3 bg-green-50 text-green-700 rounded-lg border border-green-200">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span className="font-semibold">Result Saved to History</span>
      </div>
    );
  }

  if (!isExpanded) {
    return (
      <Button 
        onClick={() => setIsExpanded(true)} 
        className="w-full mt-6" 
        size="lg"
      >
        Save Result to History
      </Button>
    );
  }

  return (
    <div className="mt-6 p-4 rounded-xl border border-gray-200 bg-gray-50">
      <h4 className="font-medium text-gray-900 mb-2">Save Analysis</h4>
      <Textarea
        placeholder="Add clinical notes, patient reference, or observations..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={3}
        className="mb-3"
      />
      <div className="flex gap-3">
        <Button 
          onClick={() => onSave(notes)} 
          isLoading={isSaving}
          className="flex-1"
        >
          Confirm Save
        </Button>
        <Button 
          variant="secondary" 
          onClick={() => setIsExpanded(false)}
          disabled={isSaving}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
