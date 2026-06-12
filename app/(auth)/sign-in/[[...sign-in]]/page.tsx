"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { Mail, Lock, Loader2 } from "lucide-react";
import AuthCard from "@/components/auth/AuthCard";
import SocialAuthButtons from "@/components/auth/SocialAuthButtons";

const inputClass =
  "w-full bg-surface-container border border-surface-container-high rounded-md py-3 pl-10 pr-4 text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all placeholder:text-outline";

export default function SignInPage() {
  const router = useRouter();
  const { signIn } = useSignIn();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);

    const { error: signInError } = await signIn.password({ identifier: email, password });
    if (signInError) {
      setError(signInError.longMessage ?? signInError.message);
      setSubmitting(false);
      return;
    }
    const { error: finalizeError } = await signIn.finalize();
    if (finalizeError) {
      setError(finalizeError.longMessage ?? finalizeError.message);
      setSubmitting(false);
      return;
    }
    router.push("/");
  };

  const handleSocial = async (strategy: "oauth_google" | "oauth_github") => {
    setError(null);
    const { error: ssoError } = await signIn.sso({
      strategy,
      redirectUrl: "/",
      redirectCallbackUrl: "/sso-callback",
    });
    if (ssoError) {
      setError(ssoError.longMessage ?? ssoError.message);
    }
  };

  return (
    <AuthCard subtitle="Sign in to your AI Mentor">
      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="space-y-2">
          <label htmlFor="email" className="label-caps text-on-surface-variant block tracking-widest">
            Email Address
          </label>
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="label-caps text-on-surface-variant block tracking-widest">
              Password
            </label>
            <Link href="/forgot-password" className="text-body-sm text-primary hover:text-primary-fixed transition-colors">
              Forgot?
            </Link>
          </div>
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={inputClass}
            />
          </div>
        </div>

        {error && <p className="text-body-sm text-error">{error}</p>}

        {/* Clerk bot protection */}
        <div id="clerk-captcha" />

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-primary text-on-primary text-headline-md rounded-md py-3 hover:bg-primary-fixed transition-colors active:scale-[0.98] mt-2 disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {submitting && <Loader2 size={20} className="animate-spin" />}
          Sign In
        </button>
      </form>

      <SocialAuthButtons onSelect={handleSocial} disabled={submitting} />

      <p className="text-body-sm text-on-surface-variant text-center mt-8 relative z-10">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-primary hover:text-primary-fixed transition-colors font-semibold">
          Sign up
        </Link>
      </p>
    </AuthCard>
  );
}
