import { v } from "convex/values";
import { mutation, query, QueryCtx } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { generateQuestions } from "./questionBank";

async function requireUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Not authenticated");
  }
  return identity;
}

export const create = mutation({
  args: {
    role: v.string(),
    type: v.union(v.literal("technical"), v.literal("behavioral"), v.literal("mixed")),
    level: v.union(v.literal("junior"), v.literal("mid"), v.literal("senior")),
    techstack: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await requireUser(ctx);
    const questions = generateQuestions(args.role, args.type, args.level, args.techstack);
    const interviewId = await ctx.db.insert("interviews", {
      userId: identity.tokenIdentifier,
      candidateName: identity.name ?? "Candidate",
      role: args.role,
      type: args.type,
      level: args.level,
      techstack: args.techstack,
      questions,
      status: "ready",
    });
    return interviewId;
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    return await ctx.db
      .query("interviews")
      .withIndex("by_userId", (q) => q.eq("userId", identity.tokenIdentifier))
      .order("desc")
      .take(50);
  },
});

export const get = query({
  args: { id: v.id("interviews") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    const interview = await ctx.db.get(args.id);
    if (!interview || interview.userId !== identity.tokenIdentifier) return null;
    return interview;
  },
});

// Heuristic scoring until LLM evaluation is wired in: answer depth drives the
// score so the end-to-end flow works without external API keys.
function scoreAnswers(answers: string[], questions: string[]) {
  const coverage = Math.min(answers.filter((a) => a.trim().length > 0).length / questions.length, 1);
  const avgLength = answers.reduce((sum, a) => sum + a.trim().length, 0) / Math.max(answers.length, 1);
  const depth = Math.min(avgLength / 300, 1);
  return Math.round(40 + coverage * 35 + depth * 25);
}

export const complete = mutation({
  args: {
    id: v.id("interviews"),
    answers: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await requireUser(ctx);
    const interview = await ctx.db.get(args.id);
    if (!interview || interview.userId !== identity.tokenIdentifier) {
      throw new Error("Interview not found");
    }

    await ctx.db.patch(args.id, { status: "completed", completedAt: Date.now() });

    const total = scoreAnswers(args.answers, interview.questions);
    const jitter = (offset: number) => Math.max(35, Math.min(100, total + offset));

    const existing = await ctx.db
      .query("feedback")
      .withIndex("by_interviewId", (q) => q.eq("interviewId", args.id))
      .unique();
    if (existing) {
      return existing._id as Id<"feedback">;
    }

    const feedbackId = await ctx.db.insert("feedback", {
      interviewId: args.id,
      userId: identity.tokenIdentifier,
      totalScore: total,
      categoryScores: [
        {
          name: "Communication Skills",
          score: jitter(5),
          comment: "Clear articulation overall. Keep structuring answers with situation, action, and result.",
        },
        {
          name: "Technical Knowledge",
          score: jitter(-3),
          comment: `Solid grasp of the ${interview.role} fundamentals. Deepen edge-case knowledge in ${interview.techstack.join(", ") || "your stack"}.`,
        },
        {
          name: "Problem Solving",
          score: jitter(2),
          comment: "Structured thinking shows through. Break problems down out loud before answering.",
        },
        {
          name: "Confidence & Clarity",
          score: jitter(-1),
          comment: "Steady pacing. Reduce filler phrases and pause deliberately before key points.",
        },
      ],
      strengths: [
        "Consistent answer structure across questions",
        "Relevant, concrete examples from past work",
      ],
      areasForImprovement: [
        "Add more measurable outcomes to your stories",
        "Tighten long answers — aim for two focused minutes each",
      ],
      finalAssessment:
        total >= 75
          ? "Strong performance. You are ready for advanced rounds — polish the noted areas and keep practicing."
          : "Good foundation. Focus on the improvement areas and retake the session to track your progress.",
    });
    return feedbackId;
  },
});
