"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import {
  BarChart3,
  MessageCircle,
  Code2,
  Brain,
  Sparkles,
  BadgeCheck,
  TrendingUp,
  CircleAlert,
  Loader2,
  RotateCcw,
} from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

const categoryIcons = [MessageCircle, Code2, Brain, Sparkles];

function ScoreRing({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference * (1 - score / 100);
  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        <circle
          className="text-primary drop-shadow-[0_0_8px_rgba(222,213,255,0.5)] transition-[stroke-dashoffset] duration-1000 ease-out"
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="font-mono text-headline-xl font-bold text-primary">{score}</span>
        <span className="label-caps text-on-surface-variant">/ 100</span>
      </div>
    </div>
  );
}

export default function FeedbackReport({ interviewId }: { interviewId: Id<"interviews"> }) {
  const interview = useQuery(api.interviews.get, { id: interviewId });
  const feedback = useQuery(api.feedback.getByInterview, { interviewId });

  if (interview === undefined || feedback === undefined) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  if (interview === null || feedback === null) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
        <h1 className="text-headline-md text-on-surface">No feedback available yet</h1>
        <p className="text-body-md text-on-surface-variant">
          Complete the interview session to generate your AI feedback report.
        </p>
        <Link href="/" className="text-primary hover:underline">
          Back to dashboard
        </Link>
      </div>
    );
  }

  const ready = feedback.totalScore >= 75;

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <header className="flex flex-col gap-2">
        <p className="label-caps text-primary tracking-widest">Session Review</p>
        <h1 className="text-headline-lg font-bold text-on-surface">
          Feedback on the Interview —{" "}
          <span className="text-on-surface-variant font-normal capitalize">
            {interview.level} {interview.role}
          </span>
        </h1>
        <p className="text-body-md text-on-surface-variant max-w-2xl mt-2">
          Comprehensive analysis of your performance across key technical and behavioral metrics.
        </p>
      </header>

      {/* Score + insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-surface-container-low rounded-xl border border-white/5 p-8 relative overflow-hidden flex flex-col justify-center items-center glow-hover">
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(222,213,255,0.05),transparent)] opacity-50" />
          <h2 className="label-caps text-on-surface-variant mb-6 tracking-widest relative z-10">
            Overall Impression
          </h2>
          <div className="relative z-10 mb-4">
            <ScoreRing score={feedback.totalScore} />
          </div>
          <p className="text-body-sm text-center text-on-surface-variant relative z-10 max-w-[220px]">
            {ready
              ? "Strong performance. Ready for advanced technical rounds."
              : "Solid foundation. Keep practicing to raise your score."}
          </p>
        </div>

        <div className="bg-surface-container-low rounded-xl border border-white/5 overflow-hidden lg:col-span-2 relative min-h-[300px] flex flex-col justify-end">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(195,181,253,0.15),transparent_60%)]" />
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
          <div className="p-6 relative z-10">
            <div className="inline-flex items-center gap-2 bg-surface/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 mb-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="label-caps text-primary">AI Analysis Complete</span>
            </div>
            <h3 className="text-headline-md font-semibold text-on-surface mb-4">Session Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-surface-container/60 backdrop-blur-md rounded-md border border-white/5 p-4">
                <p className="label-caps text-primary mb-2 flex items-center gap-2">
                  <TrendingUp size={14} /> Strengths
                </p>
                <ul className="text-body-sm text-on-surface-variant space-y-1.5 list-disc list-inside">
                  {feedback.strengths.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-surface-container/60 backdrop-blur-md rounded-md border border-white/5 p-4">
                <p className="label-caps text-secondary mb-2 flex items-center gap-2">
                  <CircleAlert size={14} /> Areas for Improvement
                </p>
                <ul className="text-body-sm text-on-surface-variant space-y-1.5 list-disc list-inside">
                  {feedback.areasForImprovement.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category breakdown */}
      <div className="mt-4">
        <h2 className="text-headline-md font-semibold text-on-surface mb-6 flex items-center gap-3">
          <BarChart3 size={24} className="text-primary" />
          Breakdown of the Interview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {feedback.categoryScores.map((category, i) => {
            const Icon = categoryIcons[i % categoryIcons.length];
            return (
              <div
                key={category.name}
                className="bg-surface-container-low rounded-xl border border-white/5 p-6 hover:bg-surface-container transition-colors group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-surface-variant flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-body-md font-semibold text-on-surface">{category.name}</h3>
                  </div>
                  <span className="font-mono text-primary text-lg font-bold">{category.score}/100</span>
                </div>
                <div className="w-full h-1.5 bg-surface-variant rounded-full mb-4 overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-[width] duration-700"
                    style={{ width: `${category.score}%` }}
                  />
                </div>
                <p className="text-body-sm text-on-surface-variant">{category.comment}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Verdict banner */}
      <div className="mt-4 bg-gradient-to-r from-primary-container/20 to-surface-container-low border border-primary/20 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="shrink-0 w-24 h-24 rounded-full bg-primary-container flex items-center justify-center border-4 border-surface shadow-[0_0_20px_rgba(195,181,253,0.3)]">
          <BadgeCheck size={40} className="text-on-primary-container" />
        </div>
        <div className="flex-1 text-center md:text-left z-10">
          <h2 className="text-headline-md font-bold text-primary mb-2">
            Verdict: {ready ? "Ready" : "Keep Practicing"}
          </h2>
          <p className="text-body-md text-on-surface-variant">{feedback.finalAssessment}</p>
        </div>
        <div className="shrink-0 z-10">
          <Link
            href="/interview/new"
            className="px-6 py-3 bg-primary text-on-primary font-bold rounded-lg hover:brightness-110 transition-all active:scale-95 flex items-center gap-2"
          >
            <RotateCcw size={16} />
            Practice Again
          </Link>
        </div>
      </div>
    </div>
  );
}
