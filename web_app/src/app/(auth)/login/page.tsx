"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/hooks/useToast";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { addToast } = useToast();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated") { router.push("/dashboard"); }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) { setError("Please fill in all fields."); return; }
    setIsLoading(true);
    setError(null);
    const result = await signIn("credentials", { username, password, redirect: false });
    if (result?.error) { setError("Invalid username or password."); setIsLoading(false); }
    else { addToast("Successfully logged in", "success"); router.push("/dashboard"); router.refresh(); }
  };

  if (status === "loading" || status === "authenticated") {
    return <div className="py-12 flex justify-center"><div className="w-8 h-8 rounded-full border-4 border-teal-soft border-t-teal animate-spin"></div></div>;
  }

  return (
    <>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-primary tracking-tight">Welcome Back</h2>
        <p className="text-sm text-secondary font-medium mt-2">Sign in to your practitioner dashboard.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input label="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="e.g. dr.smith" autoComplete="username" required />
        <div className="relative">
          <Input label="Password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" required className="pr-10" />
          <button type="button" className="absolute right-3 top-[34px] text-secondary hover:text-primary transition-colors focus:outline-none" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200">
            <p className="text-sm font-medium text-red-600 text-center">{error}</p>
          </div>
        )}
        <Button type="submit" className="w-full h-11 gap-2 rounded-xl mt-4 text-base" isLoading={isLoading}>
          <LogIn size={18} />
          Sign In
        </Button>
      </form>
      <div className="mt-8 text-center border-t border-gray-100 pt-6">
        <p className="text-sm text-secondary font-medium">
          Forgot credentials? <span className="text-teal cursor-pointer hover:underline">Contact System Admin.</span>
        </p>
      </div>
    </>
  );
}
