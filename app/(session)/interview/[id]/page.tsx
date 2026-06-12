import InterviewRoom from "@/components/InterviewRoom";
import { Id } from "@/convex/_generated/dataModel";

export default async function InterviewSessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <InterviewRoom interviewId={id as Id<"interviews">} />;
}
