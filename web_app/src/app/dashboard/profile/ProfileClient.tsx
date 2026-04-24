"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/hooks/useToast";
import { Pencil } from "lucide-react";

export default function ProfileClient({ userId, username, initialName }: { userId: string, username: string, initialName: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(initialName);
  const [isSaving, setIsSaving] = useState(false);
  
  const { addToast } = useToast();
  const router = useRouter();

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName })
      });
      if (!res.ok) throw new Error("Failed to update profile");
      setIsEditing(false);
      addToast("Profile updated", "success");
      router.refresh();
    } catch (e: any) {
      addToast(e.message, "error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full text-center">
      <h2 className="text-xl font-bold text-primary mb-1">{username}</h2>
      
      {isEditing ? (
        <div className="mt-4 space-y-3">
          <Input 
            value={displayName} 
            onChange={e => setDisplayName(e.target.value)} 
            placeholder="Display Name"
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave} isLoading={isSaving} className="w-full">Save</Button>
            <Button size="sm" variant="secondary" onClick={() => { setDisplayName(initialName); setIsEditing(false); }} disabled={isSaving} className="w-full">Cancel</Button>
          </div>
        </div>
      ) : (
        <div className="mt-2 flex flex-col items-center">
          <p className="text-secondary mb-3">{displayName}</p>
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} className="gap-1.5">
            <Pencil size={13} />
            Edit Profile
          </Button>
        </div>
      )}
    </div>
  );
}
