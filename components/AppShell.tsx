"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { LayoutDashboard, Mic, Home, Plus } from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/interview/new", label: "New Interview", icon: Mic },
];

const mobileItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/interview/new", label: "Practice", icon: Mic },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <div className="min-h-screen">
      {/* Top bar (mobile) */}
      <header className="md:hidden bg-surface/80 backdrop-blur-xl fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 h-16 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="" width={32} height={32} />
          <span className="text-headline-md font-bold text-primary">InterviewIQ</span>
        </Link>
        <UserButton />
      </header>

      {/* Sidebar (desktop) */}
      <nav className="bg-surface-container w-64 hidden md:flex flex-col border-r border-white/10 fixed left-0 top-0 h-screen py-8 z-40">
        <Link href="/" className="px-6 mb-12 flex items-center gap-3">
          <Image src="/logo.svg" alt="" width={40} height={40} />
          <div>
            <div className="text-headline-md font-bold text-primary leading-tight">InterviewIQ</div>
            <div className="label-caps text-on-surface-variant mt-1">AI Interview Mentor</div>
          </div>
        </Link>
        <div className="flex flex-col gap-2 px-4 flex-grow">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={
                isActive(href)
                  ? "flex items-center gap-4 py-3 rounded-r-md text-primary font-bold border-l-4 border-primary pl-4 bg-surface-container-high"
                  : "flex items-center gap-4 py-3 rounded-r-md text-on-surface-variant pl-4 border-l-4 border-transparent hover:bg-surface-container-high transition-colors"
              }
            >
              <Icon size={20} /> {label}
            </Link>
          ))}
        </div>
        <div className="px-6 mt-auto flex flex-col gap-6">
          <Link
            href="/interview/new"
            className="w-full bg-primary text-on-primary font-bold py-3 rounded-md hover:brightness-110 transition-all active:scale-95 shadow-[0_0_15px_rgba(222,213,255,0.2)] flex items-center justify-center gap-2"
          >
            <Plus size={18} /> Start New Session
          </Link>
          <div className="flex items-center gap-3">
            <UserButton />
            <span className="text-body-sm text-on-surface-variant">My Account</span>
          </div>
        </div>
      </nav>

      {/* Main canvas */}
      <main className="md:ml-64 pt-24 pb-24 md:py-12 px-4 md:px-10 max-w-[1280px]">{children}</main>

      {/* Bottom nav (mobile) */}
      <nav className="md:hidden bg-surface/90 backdrop-blur-xl fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-2 border-t border-white/10">
        {mobileItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={
              isActive(href)
                ? "flex flex-col items-center justify-center bg-primary-container text-on-primary rounded-2xl px-4 py-1 transition-all active:scale-95"
                : "flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 rounded-2xl transition-all active:scale-95 hover:text-primary"
            }
          >
            <Icon size={22} />
            <span className="label-caps mt-1">{label}</span>
          </Link>
        ))}
        <div className="flex flex-col items-center justify-center px-4 py-1">
          <UserButton />
          <span className="label-caps mt-1 text-on-surface-variant">Profile</span>
        </div>
      </nav>
    </div>
  );
}
