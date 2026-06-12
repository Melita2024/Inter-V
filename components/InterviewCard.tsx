"use client";

import Link from "next/link";
import { Code2, MessageSquare, Layers } from "lucide-react";
import { Doc } from "@/convex/_generated/dataModel";

const typeIcon = {
  technical: Code2,
  behavioral: MessageSquare,
  mixed: Layers,
};

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function InterviewCard({ interview }: { interview: Doc<"interviews"> }) {
  const Icon = typeIcon[interview.type];
  const completed = interview.status === "completed";

  return (
    <div className="bg-surface-container rounded-xl border border-white/10 glow-hover hover:border-primary/50 transition-all p-6 flex flex-col group">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-md bg-surface flex items-center justify-center border border-white/5 text-primary group-hover:bg-primary/10 transition-colors">
          <Icon size={22} />
        </div>
        <span
          className={
            completed
              ? "label-caps px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30"
              : "label-caps px-3 py-1 rounded-full bg-surface text-on-surface-variant border border-white/10"
          }
        >
          {completed ? "Completed" : "Ready"}
        </span>
      </div>
      <h3 className="text-headline-md text-on-surface mb-1 capitalize">{interview.role}</h3>
      <p className="label-caps text-on-surface-variant mb-2">
        {interview.type} · {interview.level}
      </p>
      {interview.techstack.length > 0 && (
        <p className="text-body-sm text-on-surface-variant mb-4 truncate">{interview.techstack.join(" · ")}</p>
      )}
      <p className="label-caps text-outline mb-6 flex-grow">{formatDate(interview._creationTime)}</p>
      {completed ? (
        <Link
          href={`/interview/${interview._id}/feedback`}
          className="w-full text-center border border-primary text-primary text-body-sm font-bold py-2 rounded-md hover:bg-primary/10 transition-colors active:scale-95"
        >
          View Feedback
        </Link>
      ) : (
        <Link
          href={`/interview/${interview._id}`}
          className="w-full text-center bg-primary text-on-primary text-body-sm font-bold py-2 rounded-md hover:brightness-110 transition-all active:scale-95"
        >
          Start Interview
        </Link>
      )}
    </div>
  );
}
