// Static question templates used until an LLM-backed generator (Gemini/Claude via
// a Convex action) is wired up. Not a registered Convex function module — helpers only.

type InterviewType = "technical" | "behavioral" | "mixed";
type Level = "junior" | "mid" | "senior";

const TECHNICAL_TEMPLATES = [
  "Walk me through how you would architect a {role} project using {tech}.",
  "What are the most common performance pitfalls when working with {tech}, and how do you avoid them?",
  "How do you approach testing in a {tech} codebase?",
  "Describe how you would debug a production incident in a {tech} application.",
  "What recent developments in {tech} are you most excited about, and why?",
  "How would you explain the core concepts of {tech} to a junior teammate?",
];

const BEHAVIORAL_TEMPLATES = [
  "Tell me about a time you handled a difficult engineering challenge.",
  "Describe a situation where you disagreed with a teammate. How did you resolve it?",
  "Tell me about a project you are most proud of as a {role}.",
  "How do you prioritize when several urgent tasks land at once?",
  "Describe a time you received tough feedback. What did you do with it?",
  "Tell me about a time you had to learn a new technology quickly.",
];

const LEVEL_SUFFIX: Record<Level, string> = {
  junior: " Focus on fundamentals in your answer.",
  mid: "",
  senior: " Include how you would lead the team through it.",
};

export function generateQuestions(
  role: string,
  type: InterviewType,
  level: Level,
  techstack: string[],
): string[] {
  const tech = techstack.length > 0 ? techstack.join(", ") : role;
  const fill = (t: string) => t.replaceAll("{role}", role).replaceAll("{tech}", tech);

  const technical = TECHNICAL_TEMPLATES.map(fill);
  const behavioral = BEHAVIORAL_TEMPLATES.map(fill);

  let pool: string[];
  if (type === "technical") pool = technical;
  else if (type === "behavioral") pool = behavioral;
  else pool = [technical[0], behavioral[0], technical[1], behavioral[2], technical[2], behavioral[3]];

  return pool.slice(0, 5).map((q) => q + LEVEL_SUFFIX[level]);
}
