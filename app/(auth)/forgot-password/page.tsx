"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { Mail, Lock, KeyRound, Loader2 } from "lucide-react";
import AuthCard from "@/components/auth/AuthCard";

const inputClass =
  "w-full bg-surface-container border border-surface-container-high rounded-md py-3 pl-10 pr-4 text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all placeholder:text-outline";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { signIn } = useSignIn();

  const [step, setStep] = useState<"email" | "reset">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const sendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);

    const { error: createError } = await signIn.create({ identifier: email });
    if (createError) {
      setError(createError.longMessage ?? createError.message);
      setSubmitting(false);
      return;
    }
    const { error: sendError } = await signIn.resetPasswordEmailCode.sendCode();
    if (sendError) {
      setError(sendError.longMessage ?? sendError.message);
      setSubmitting(false);
      return;
    }
    setStep("reset");
    setSubmitting(false);
  };

  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);

    const { error: verifyError } = await signIn.resetPasswordEmailCode.verifyCode({ code });
    if (verifyError) {
      setError(verifyError.longMessage ?? verifyError.message);
      setSubmitting(false);
      return;
    }
    const { error: submitError } = await signIn.resetPasswordEmailCode.submitPassword({ password });
    if (submitError) {
      setError(submitError.longMessage ?? submitError.message);
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

  return (
    <AuthCard
      subtitle={step === "email" ? "Reset your password" : `Enter the code sent to ${email} and choose a new password`}
    >
      {step === "email" ? (
        <form onSubmit={sendCode} className="space-y-6 relative z-10">
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
          {error && <p className="text-body-sm text-error">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary text-on-primary text-headline-md rounded-md py-3 hover:bg-primary-fixed transition-colors active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {submitting && <Loader2 size={20} className="animate-spin" />}
            Send Reset Code
          </button>
        </form>
      ) : (
        <form onSubmit={resetPassword} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label htmlFor="code" className="label-caps text-on-surface-variant block tracking-widest">
              Reset Code
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
          <div className="space-y-2">
            <label htmlFor="password" className="label-caps text-on-surface-variant block tracking-widest">
              New Password
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
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary text-on-primary text-headline-md rounded-md py-3 hover:bg-primary-fixed transition-colors active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {submitting && <Loader2 size={20} className="animate-spin" />}
            Reset Password
          </button>
        </form>
      )}
      <p className="text-body-sm text-on-surface-variant text-center mt-8 relative z-10">
        Remembered it?{" "}
        <Link href="/sign-in" className="text-primary hover:text-primary-fixed transition-colors font-semibold">
          Sign in
        </Link>
      </p>
    </AuthCard>
  );
}
