import FeedbackReport from "@/components/FeedbackReport";
import { Id } from "@/convex/_generated/dataModel";

export default async function FeedbackPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <FeedbackReport interviewId={id as Id<"interviews">} />;
}
