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

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

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
    return <div className="py-12 flex justify-center"><div className="w-8 h-8 rounded-full border-4 border-white/10 border-t-neon-blue animate-spin"></div></div>;
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">Sign in</h2>
        <p className="text-sm text-muted mt-1">Access your secure clinical dashboard.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
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
            className="pr-10"
          />
          <button
            type="button"
            className="absolute right-3 top-[34px] text-muted hover:text-white transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
            <p className="text-sm font-medium text-red-400 text-center">{error}</p>
          </div>
        )}

        <Button type="submit" className="w-full h-11 gap-2" isLoading={isLoading}>
          <LogIn size={16} />
          Sign in to DR-Vision
        </Button>
      </form>

      <div className="mt-8 text-center border-t border-white/10 pt-6">
        <p className="text-sm text-muted">
          Forgot password? <span className="font-medium text-white">Contact your administrator.</span>
        </p>
      </div>
    </>
  );
}
