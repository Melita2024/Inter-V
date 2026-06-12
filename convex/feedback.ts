import { v } from "convex/values";
import { query } from "./_generated/server";

export const getByInterview = query({
  args: { interviewId: v.id("interviews") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    const feedback = await ctx.db
      .query("feedback")
      .withIndex("by_interviewId", (q) => q.eq("interviewId", args.interviewId))
      .unique();
    if (!feedback || feedback.userId !== identity.tokenIdentifier) return null;
    return feedback;
  },
});
