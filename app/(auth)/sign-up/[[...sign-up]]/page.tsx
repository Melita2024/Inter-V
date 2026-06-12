"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import { Mail, Lock, KeyRound, Loader2 } from "lucide-react";
import AuthCard from "@/components/auth/AuthCard";
import SocialAuthButtons from "@/components/auth/SocialAuthButtons";

const inputClass =
  "w-full bg-surface-container border border-surface-container-high rounded-md py-3 pl-10 pr-4 text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all placeholder:text-outline";

export default function SignUpPage() {
  const router = useRouter();
  const { signUp } = useSignUp();

  const [step, setStep] = useState<"form" | "verify">("form");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);

    const { error: createError } = await signUp.create({ emailAddress: email, password });
    if (createError) {
      setError(createError.longMessage ?? createError.message);
      setSubmitting(false);
      return;
    }
    const { error: sendError } = await signUp.verifications.sendEmailCode();
    if (sendError) {
      setError(sendError.longMessage ?? sendError.message);
      setSubmitting(false);
      return;
    }
    setStep("verify");
    setSubmitting(false);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);

    const { error: verifyError } = await signUp.verifications.verifyEmailCode({ code });
    if (verifyError) {
      setError(verifyError.longMessage ?? verifyError.message);
      setSubmitting(false);
      return;
    }
    const { error: finalizeError } = await signUp.finalize();
    if (finalizeError) {
      setError(finalizeError.longMessage ?? finalizeError.message);
      setSubmitting(false);
      return;
    }
    router.push("/");
  };

  const handleSocial = async (strategy: "oauth_google" | "oauth_github") => {
    setError(null);
    const { error: ssoError } = await signUp.sso({
      strategy,
      redirectUrl: "/",
      redirectCallbackUrl: "/sso-callback",
    });
    if (ssoError) {
      setError(ssoError.longMessage ?? ssoError.message);
    }
  };

  if (step === "verify") {
    return (
      <AuthCard subtitle={`Enter the verification code sent to ${email}`}>
        <form onSubmit={handleVerify} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label htmlFor="code" className="label-caps text-on-surface-variant block tracking-widest">
              Verification Code
            </label>
            <div className="relative">
              <KeyRound size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
              <input
                id="code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="123456"
                className={`${inputClass} font-mono tracking-[0.3em]`}
              />
            </div>
          </div>

          {error && <p className="text-body-sm text-error">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary text-on-primary text-headline-md rounded-md py-3 hover:bg-primary-fixed transition-colors active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {submitting && <Loader2 size={20} className="animate-spin" />}
            Verify Email
          </button>
          <button
            type="button"
            onClick={() => setStep("form")}
            className="w-full text-body-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            Back
          </button>
        </form>
      </AuthCard>
    );
  }

  return (
    <AuthCard subtitle="Create your account and start practicing">
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
          <label htmlFor="password" className="label-caps text-on-surface-variant block tracking-widest">
            Password
          </label>
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
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
          Create Account
        </button>
      </form>

      <SocialAuthButtons onSelect={handleSocial} disabled={submitting} />

      <p className="text-body-sm text-on-surface-variant text-center mt-8 relative z-10">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-primary hover:text-primary-fixed transition-colors font-semibold">
          Sign in
        </Link>
      </p>
    </AuthCard>
  );
}
