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
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setIsLoading(true);
    setError(null);
    const result = await signIn("credentials", { username, password, redirect: false });
    if (result?.error) {
      setError("Invalid username or password.");
      setIsLoading(false);
    } else {
      addToast("Successfully logged in", "success");
      router.push("/dashboard");
      router.refresh();
    }
  };

  if (status === "loading" || status === "authenticated") {
    return (
      <div className="py-12 flex justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-gray-300 border-t-gray-600 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="mb-5 text-center">
        <h2 className="text-xl font-semibold text-gray-900 tracking-tight">Welcome Back</h2>
        <p className="text-xs text-gray-500 mt-1.5">Sign in to your practitioner dashboard.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input 
          label="Username" 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="e.g. dr.smith" 
          autoComplete="username" 
          required 
        />
        
        <div className="relative">
          <Input 
            label="Password" 
            type={showPassword ? "text" : "password"} 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="••••••••" 
            autoComplete="current-password" 
            required 
            className="pr-8"
          />
          <button 
            type="button" 
            className="absolute right-2 top-[34px] text-gray-400 hover:text-gray-600 transition-colors focus:outline-none" 
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        
        {error && (
          <div className="p-2.5 rounded-md bg-red-50 border border-red-200">
            <p className="text-xs font-medium text-red-600 text-center">{error}</p>
          </div>
        )}
        
        <Button type="submit" className="w-full h-10 gap-2 rounded-md mt-2 text-sm" isLoading={isLoading}>
          <LogIn size={15} />
          Sign In
        </Button>
      </form>
      
      <div className="mt-6 text-center border-t border-gray-100 pt-5">
        <p className="text-xs text-gray-500">
          Forgot credentials? <span className="text-gray-700 cursor-pointer hover:text-gray-900 transition-colors">Contact System Admin.</span>
        </p>
      </div>
    </>
  );
}