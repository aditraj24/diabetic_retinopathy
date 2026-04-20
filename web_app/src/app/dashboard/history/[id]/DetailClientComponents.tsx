"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/hooks/useToast";

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
    <div className="space-y-8">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">Clinical Notes</h3>
          {!isEditingNotes && (
            <button 
              onClick={() => setIsEditingNotes(true)}
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Edit Notes
            </button>
          )}
        </div>
        
        {isEditingNotes ? (
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Add patient observations..."
              className="mb-3"
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSaveNotes} isLoading={isSavingNotes}>Save</Button>
              <Button size="sm" variant="secondary" onClick={() => {
                setNotes(initialNotes);
                setIsEditingNotes(false);
              }} disabled={isSavingNotes}>Cancel</Button>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-gray-700 text-sm whitespace-pre-wrap min-h-[100px]">
            {notes || <span className="text-gray-400 italic">No notes recorded for this analysis.</span>}
          </div>
        )}
      </div>
      
      <div className="pt-6 border-t border-gray-100 flex justify-end">
        <Button variant="ghost" className="text-red-600 hover:bg-red-50" onClick={() => setShowDeleteModal(true)}>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          Delete Record
        </Button>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={() => setShowDeleteModal(false)} />
          <div className="relative z-10 w-full max-w-sm scale-100 transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all p-6">
             <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
               <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
             </div>
             <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Analysis Record</h3>
             <p className="text-sm text-gray-500 mb-6">Are you sure you want to permanently delete this analysis? The original image will also be removed from secure storage.</p>
             <div className="flex gap-3">
               <Button variant="danger" className="flex-1" onClick={handleDelete} isLoading={isDeleting}>Confirm Delete</Button>
               <Button variant="secondary" className="flex-1" onClick={() => setShowDeleteModal(false)} disabled={isDeleting}>Cancel</Button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
