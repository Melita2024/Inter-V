import { SignIn } from "@clerk/nextjs";
import { clerkAppearance } from "@/components/clerk-appearance";

export default function SignInPage() {
  return <SignIn appearance={clerkAppearance} />;
}
