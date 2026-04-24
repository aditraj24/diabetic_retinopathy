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
    <div className="space-y-8">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white">Clinical Notes</h3>
          {!isEditingNotes && (
            <button 
              onClick={() => setIsEditingNotes(true)}
              className="text-sm font-medium text-neon-blue hover:text-cyan transition-colors flex items-center gap-1.5"
            >
              <Pencil size={13} />
              Edit Notes
            </button>
          )}
        </div>
        
        {isEditingNotes ? (
          <div className="p-4 bg-white/[0.03] rounded-xl border border-white/10">
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
          <div className="p-4 bg-white/[0.03] rounded-xl border border-white/10 text-muted text-sm whitespace-pre-wrap min-h-[100px]">
            {notes || <span className="text-white/20 italic">No notes recorded for this analysis.</span>}
          </div>
        )}
      </div>
      
      <div className="pt-6 border-t border-white/10 flex justify-end">
        <Button variant="ghost" className="text-red-400 hover:bg-red-500/10 gap-1.5" onClick={() => setShowDeleteModal(true)}>
          <Trash2 size={14} />
          Delete Record
        </Button>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setShowDeleteModal(false)} />
          <div className="relative z-10 w-full max-w-sm glass-card p-6">
             <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
               <AlertTriangle className="w-6 h-6 text-red-400" />
             </div>
             <h3 className="text-lg font-bold text-white mb-2">Delete Analysis Record</h3>
             <p className="text-sm text-muted mb-6">Are you sure you want to permanently delete this analysis? The original image will also be removed from secure storage.</p>
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
