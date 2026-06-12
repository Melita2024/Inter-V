"use client";

type OAuthStrategy = "oauth_google" | "oauth_github";

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.57 5.57 0 0 1-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29A7.16 7.16 0 0 1 4.89 12c0-.8.14-1.57.38-2.29V6.62H1.29a12 12 0 0 0 0 10.76l3.98-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="w-5 h-5 text-on-surface" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function SocialAuthButtons({
  onSelect,
  disabled,
}: {
  onSelect: (strategy: OAuthStrategy) => void;
  disabled?: boolean;
}) {
  return (
    <div className="relative z-10">
      <div className="relative flex items-center py-4">
        <div className="flex-grow border-t border-surface-container-high" />
        <span className="shrink-0 mx-4 label-caps text-outline tracking-widest">Or continue with</span>
        <div className="flex-grow border-t border-surface-container-high" />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <button
          type="button"
          disabled={disabled}
          onClick={() => onSelect("oauth_google")}
          className="flex items-center justify-center gap-2 bg-surface-container border border-surface-container-high hover:bg-surface-container-high rounded-md py-2.5 transition-colors active:scale-[0.98] disabled:opacity-50"
        >
          <GoogleIcon />
          <span className="text-body-sm">Google</span>
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() => onSelect("oauth_github")}
          className="flex items-center justify-center gap-2 bg-surface-container border border-surface-container-high hover:bg-surface-container-high rounded-md py-2.5 transition-colors active:scale-[0.98] disabled:opacity-50"
        >
          <GitHubIcon />
          <span className="text-body-sm">GitHub</span>
        </button>
      </div>
    </div>
  );
}
