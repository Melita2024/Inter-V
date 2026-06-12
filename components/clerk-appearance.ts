import type { Appearance } from "@clerk/types";

// Maps Clerk components onto the PrepWise Vision design system tokens
export const clerkAppearance: Appearance = {
  variables: {
    colorPrimary: "#c3b5fd",
    colorBackground: "#1f1f22",
    colorText: "#e4e1e6",
    colorTextSecondary: "#c9c4d1",
    colorInputBackground: "#1b1b1e",
    colorInputText: "#e4e1e6",
    colorDanger: "#ffb4ab",
    colorNeutral: "#e4e1e6",
    borderRadius: "0.5rem",
    fontFamily: "var(--font-hanken), sans-serif",
  },
  elements: {
    card: "border border-white/10 shadow-[0_0_30px_rgba(222,213,255,0.08)]",
    headerTitle: "text-on-surface",
    formButtonPrimary:
      "bg-primary-container text-on-primary hover:brightness-110 transition-all font-bold",
    footerActionLink: "text-primary-container hover:text-primary",
  },
};
