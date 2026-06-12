import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

// Completes the Google/GitHub OAuth handshake, then redirects home
export default function SSOCallbackPage() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Loader2 size={32} className="animate-spin text-primary" />
      <p className="label-caps text-on-surface-variant">Completing sign in…</p>
      <AuthenticateWithRedirectCallback signInFallbackRedirectUrl="/" signUpFallbackRedirectUrl="/" />
    </div>
  );
}
