"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Save, Check } from "lucide-react";

interface SaveResultButtonProps {
  onSave: (notes: string) => void;
  isSaving: boolean;
  isSaved: boolean;
}

export function SaveResultButton({ onSave, isSaving, isSaved }: SaveResultButtonProps) {
  const [notes, setNotes] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  if (isSaved) {
    return (
      <div className="mt-8 flex items-center justify-center p-4 bg-[#0D6B6B]/5 border border-[#0D6B6B]/20 rounded-2xl text-[#0D6B6B] font-bold shadow-sm">
        <Check className="w-5 h-5 mr-2" strokeWidth={2.5} />
        Result Saved to Patient History
      </div>
    );
  }

  return (
    <div className="mt-8 pt-6 border-t border-gray-100">
      {!isExpanded ? (
        <Button 
          onClick={() => setIsExpanded(true)} 
          className="w-full h-12 text-base font-bold shadow-md bg-[#0D6B6B] hover:bg-[#0a5252] focus:ring-[#0D6B6B]/20"
        >
          <Save className="w-5 h-5 mr-2" />
          Save Analysis Result
        </Button>
      ) : (
        <div className="space-y-4 animate-fade-in-up">
          <label className="block text-sm font-bold text-gray-900 mb-1">
            Clinical Notes (Optional)
          </label>
          <Textarea
            placeholder="Add relevant patient observations, visual acuity, or next steps..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="resize-none border-gray-200 focus:border-[#0D6B6B] focus:ring-[#0D6B6B]/20"
          />
          <div className="flex gap-3">
            <Button 
              onClick={() => onSave(notes)} 
              isLoading={isSaving} 
              className="flex-1 font-bold shadow-md bg-[#0D6B6B] hover:bg-[#0a5252] focus:ring-[#0D6B6B]/20"
            >
              Confirm Save
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => setIsExpanded(false)} 
              disabled={isSaving}
              className="border-gray-200 text-gray-600 hover:text-gray-900 shadow-sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
