"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { X, Loader2 } from "lucide-react";
import { api } from "@/convex/_generated/api";

const types = [
  { value: "technical", label: "Technical" },
  { value: "behavioral", label: "Behavioral" },
  { value: "mixed", label: "Mixed" },
] as const;

const levels = [
  { value: "junior", label: "Junior" },
  { value: "mid", label: "Mid-Level" },
  { value: "senior", label: "Senior" },
] as const;

export default function NewInterviewPage() {
  const router = useRouter();
  const createInterview = useMutation(api.interviews.create);

  const [role, setRole] = useState("");
  const [type, setType] = useState<(typeof types)[number]["value"]>("mixed");
  const [level, setLevel] = useState<(typeof levels)[number]["value"]>("mid");
  const [techInput, setTechInput] = useState("");
  const [techstack, setTechstack] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addTech = () => {
    const value = techInput.trim();
    if (value && !techstack.includes(value)) {
      setTechstack([...techstack, value]);
    }
    setTechInput("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role.trim() || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const id = await createInterview({ role: role.trim(), type, level, techstack });
      router.push(`/interview/${id}`);
    } catch {
      setError("Could not create the interview. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-8">
      <header>
        <p className="label-caps text-primary mb-2">New Session</p>
        <h1 className="text-headline-lg text-on-surface">Set Up Your Mock Interview</h1>
        <p className="text-body-md text-on-surface-variant mt-2">
          Tell the AI mentor what you are preparing for and it will generate a tailored interview.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="bg-surface-container border border-white/10 rounded-xl p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="role" className="label-caps text-on-surface-variant">
            Target Role
          </label>
          <input
            id="role"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Frontend Engineer"
            required
            className="w-full bg-surface-container-low border border-surface-container-high rounded-md py-3 px-4 text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="label-caps text-on-surface-variant">Interview Type</span>
          <div className="grid grid-cols-3 gap-3">
            {types.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setType(t.value)}
                className={
                  type === t.value
                    ? "py-3 rounded-md bg-primary/10 border border-primary text-primary font-bold transition-all"
                    : "py-3 rounded-md bg-surface-container-low border border-white/10 text-on-surface-variant hover:border-primary/40 transition-all"
                }
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="label-caps text-on-surface-variant">Experience Level</span>
          <div className="grid grid-cols-3 gap-3">
            {levels.map((l) => (
              <button
                key={l.value}
                type="button"
                onClick={() => setLevel(l.value)}
                className={
                  level === l.value
                    ? "py-3 rounded-md bg-primary/10 border border-primary text-primary font-bold transition-all"
                    : "py-3 rounded-md bg-surface-container-low border border-white/10 text-on-surface-variant hover:border-primary/40 transition-all"
                }
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="tech" className="label-caps text-on-surface-variant">
            Tech Stack
          </label>
          <div className="flex gap-3">
            <input
              id="tech"
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTech();
                }
              }}
              placeholder="e.g. React — press Enter to add"
              className="flex-1 bg-surface-container-low border border-surface-container-high rounded-md py-3 px-4 text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={addTech}
              className="border border-primary text-primary font-bold px-5 rounded-md hover:bg-primary/10 transition-colors"
            >
              Add
            </button>
          </div>
          {techstack.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {techstack.map((tech) => (
                <span
                  key={tech}
                  className="label-caps inline-flex items-center gap-2 bg-surface-container-high text-on-surface px-3 py-1.5 rounded-full border border-white/10"
                >
                  {tech}
                  <button
                    type="button"
                    aria-label={`Remove ${tech}`}
                    onClick={() => setTechstack(techstack.filter((t) => t !== tech))}
                    className="text-on-surface-variant hover:text-error transition-colors"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {error && <p className="text-body-sm text-error">{error}</p>}

        <button
          type="submit"
          disabled={submitting || !role.trim()}
          className="w-full bg-primary text-on-primary font-bold py-3 rounded-md hover:brightness-110 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
        >
          {submitting && <Loader2 size={18} className="animate-spin" />}
          {submitting ? "Generating questions…" : "Create Interview"}
        </button>
      </form>
    </div>
  );
}
