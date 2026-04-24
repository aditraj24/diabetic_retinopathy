"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/hooks/useToast";
import { Pencil, Trash2, AlertTriangle } from "lucide-react";

export default function DetailClientComponents({ analysisId, initialNotes }: { analysisId: string, initialNotes: string }) {
  const [notes, setNotes] = useState(initialNotes);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const router = useRouter();
  const { addToast } = useToast();

  const handleSaveNotes = async () => {
    setIsSavingNotes(true);
    try {
      const res = await fetch(`/api/analyses/${analysisId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes })
      });
      if (!res.ok) throw new Error("Failed to update notes");
      
      setIsEditingNotes(false);
      addToast("Notes updated successfully", "success");
      router.refresh();
    } catch (err: any) {
      addToast(err.message, "error");
    } finally {
      setIsSavingNotes(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/analyses/${analysisId}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Failed to delete analysis");
      
      addToast("Analysis removed securely", "success");
      router.push("/dashboard/history");
      router.refresh();
    } catch (err: any) {
      addToast(err.message, "error");
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Notes Section */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Clinical Notes</h3>
          {!isEditingNotes && (
            <button 
              onClick={() => setIsEditingNotes(true)}
              className="text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1"
            >
              <Pencil size={11} />
              Edit Notes
            </button>
          )}
        </div>
        
        {isEditingNotes ? (
          <div className="bg-gray-50 rounded-md p-3 border border-gray-200">
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Add patient observations..."
              className="mb-2 text-sm"
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSaveNotes} isLoading={isSavingNotes}>Save</Button>
              <Button 
                size="sm" 
                variant="secondary" 
                onClick={() => {
                  setNotes(initialNotes);
                  setIsEditingNotes(false);
                }} 
                disabled={isSavingNotes}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-md p-3 border border-gray-200 text-sm text-gray-600 whitespace-pre-wrap min-h-[80px]">
            {notes || <span className="text-gray-400 italic">No notes recorded for this analysis.</span>}
          </div>
        )}
      </div>
      
      {/* Delete Button */}
      <div className="pt-4 border-t border-gray-100 flex justify-end">
        <Button 
          variant="ghost" 
          className="text-red-600 hover:bg-red-50 gap-1.5 text-xs"
          onClick={() => setShowDeleteModal(true)}
        >
          <Trash2 size={12} />
          Delete Record
        </Button>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-gray-900/50" onClick={() => setShowDeleteModal(false)} />
          <div className="relative z-10 w-full max-w-sm bg-white border border-gray-200 rounded-md p-5 shadow-lg">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-3">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">Delete Analysis Record</h3>
            <p className="text-xs text-gray-500 mb-5 leading-relaxed">
              Are you sure you want to permanently delete this analysis? The original image will also be removed from secure storage.
            </p>
            <div className="flex gap-2">
              <Button variant="danger" className="flex-1" onClick={handleDelete} isLoading={isDeleting}>
                Confirm Delete
              </Button>
              <Button variant="secondary" className="flex-1" onClick={() => setShowDeleteModal(false)} disabled={isDeleting}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}