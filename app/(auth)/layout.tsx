export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-12">
      {/* Ambient purple glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center w-full">{children}</div>
    </div>
  );
}
