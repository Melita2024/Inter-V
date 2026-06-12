import Image from "next/image";

// Glassmorphic auth card from the Stitch "PrepWise - Authentication" screen
export default function AuthCard({
  subtitle,
  children,
}: {
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-panel w-full max-w-md rounded-2xl p-8 shadow-2xl relative overflow-hidden glow-hover">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-primary/10 blur-3xl rounded-full opacity-50 pointer-events-none" />
      <div className="flex flex-col items-center mb-8 relative z-10">
        <Image src="/logo.svg" alt="Inter-V logo" width={64} height={64} className="mb-4" priority />
        <h1 className="text-headline-lg text-primary text-center font-bold">Inter-V</h1>
        <p className="text-body-sm text-on-surface-variant text-center mt-2">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}
