import AppShell from "@/components/AppShell";

export default function RootGroupLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
