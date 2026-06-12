import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  interviews: defineTable({
    userId: v.string(), // Clerk identity tokenIdentifier
    candidateName: v.string(),
    role: v.string(),
    type: v.union(v.literal("technical"), v.literal("behavioral"), v.literal("mixed")),
    level: v.union(v.literal("junior"), v.literal("mid"), v.literal("senior")),
    techstack: v.array(v.string()),
    questions: v.array(v.string()),
    status: v.union(v.literal("ready"), v.literal("completed")),
    completedAt: v.optional(v.number()),
  }).index("by_userId", ["userId"]),

  feedback: defineTable({
    interviewId: v.id("interviews"),
    userId: v.string(),
    totalScore: v.number(),
    categoryScores: v.array(
      v.object({
        name: v.string(),
        score: v.number(),
        comment: v.string(),
      }),
    ),
    strengths: v.array(v.string()),
    areasForImprovement: v.array(v.string()),
    finalAssessment: v.string(),
  })
    .index("by_interviewId", ["interviewId"])
    .index("by_userId", ["userId"]),
});
