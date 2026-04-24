"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Save, Check } from "lucide-react";

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
      <div className="mt-6 flex items-center justify-center p-3 bg-success-green/10 text-success-green rounded-xl border border-success-green/20">
        <Check size={18} className="mr-2" />
        <span className="font-semibold">Result Saved to History</span>
      </div>
    );
  }

  if (!isExpanded) {
    return (
      <Button 
        onClick={() => setIsExpanded(true)} 
        className="w-full mt-6 gap-2" 
        size="lg"
      >
        <Save size={18} />
        Save Result to History
      </Button>
    );
  }

  return (
    <div className="mt-6 p-4 rounded-xl border border-white/10 bg-white/[0.03]">
      <h4 className="font-medium text-white mb-2">Save Analysis</h4>
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
