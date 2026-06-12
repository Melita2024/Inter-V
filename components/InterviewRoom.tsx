"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Volume2,
  VolumeX,
  PhoneOff,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AudioLines,
} from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

function formatTime(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map((n) => n.toString().padStart(2, "0")).join(":");
}

export default function InterviewRoom({ interviewId }: { interviewId: Id<"interviews"> }) {
  const router = useRouter();
  const { user } = useUser();
  const interview = useQuery(api.interviews.get, { id: interviewId });
  const completeInterview = useMutation(api.interviews.complete);

  const [seconds, setSeconds] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [voiceOn, setVoiceOn] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [camOn, setCamOn] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [ending, setEnding] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Session timer
  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  // Speak the current question with the browser TTS (placeholder for the Vapi voice agent)
  const question = interview?.questions[questionIndex];
  useEffect(() => {
    if (!question || !voiceOn || typeof window === "undefined" || !window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(question);
    utterance.rate = 0.95;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    return () => {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    };
  }, [question, voiceOn]);

  // Webcam preview
  const toggleCamera = useCallback(async () => {
    if (camOn) {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      if (videoRef.current) videoRef.current.srcObject = null;
      setCamOn(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCamOn(true);
    } catch {
      setCamOn(false);
    }
  }, [camOn]);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    };
  }, []);

  const setAnswer = (value: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[questionIndex] = value;
      return next;
    });
  };

  const handleEnd = async () => {
    if (ending || !interview) return;
    setEnding(true);
    try {
      const padded = interview.questions.map((_, i) => answers[i] ?? "");
      await completeInterview({ id: interviewId, answers: padded });
      router.push(`/interview/${interviewId}/feedback`);
    } catch {
      setEnding(false);
    }
  };

  if (interview === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  if (interview === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-headline-md text-on-surface">Interview not found</h1>
        <Link href="/" className="text-primary hover:underline">
          Back to dashboard
        </Link>
      </div>
    );
  }

  const total = interview.questions.length;

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      {/* Session header */}
      <header className="w-full flex justify-between items-center px-4 md:px-10 h-16 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-headline-md font-bold text-primary">
            InterviewIQ
          </Link>
          <div className="h-4 w-px bg-white/20 mx-2 hidden md:block" />
          <span className="label-caps text-on-surface-variant hidden md:block">
            Live Session · {interview.role}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-error animate-pulse" />
            <span className="label-caps text-error">Recording</span>
          </div>
          <div className="label-caps text-on-surface-variant tabular-nums">{formatTime(seconds)}</div>
        </div>
      </header>

      {/* Panels */}
      <main className="flex-grow flex flex-col md:flex-row p-4 md:p-10 gap-6 relative pb-32">
        {/* AI interviewer */}
        <section className="flex-1 glass-panel rounded-xl flex flex-col relative overflow-hidden glow-hover min-h-[320px]">
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(222,213,255,0.3),transparent_70%)]" />
          <div className="p-6 z-10 flex justify-between items-start">
            <div>
              <h2 className="text-headline-md text-on-surface">AI Interviewer</h2>
              <p className="label-caps text-on-surface-variant mt-2">
                {speaking ? "Speaking…" : "Listening"}
              </p>
            </div>
            <button
              onClick={() => setVoiceOn((v) => !v)}
              aria-label={voiceOn ? "Mute AI voice" : "Unmute AI voice"}
              className="bg-surface-container-high p-2 rounded-md flex items-center justify-center border border-white/5 text-primary hover:bg-surface-container-highest transition-colors"
            >
              {voiceOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
          </div>
          {/* AI status orb */}
          <div className="flex-grow flex items-center justify-center z-10 py-8">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-48 h-48 bg-primary/20 rounded-full blur-2xl pulse-ring" />
              <div
                className="absolute w-32 h-32 bg-primary/40 rounded-full blur-xl pulse-ring"
                style={{ animationDelay: "0.5s" }}
              />
              <div className="w-24 h-24 bg-surface-container-highest rounded-full border-2 border-primary/50 flex items-center justify-center shadow-[0_0_30px_rgba(222,213,255,0.3)] z-20">
                <AudioLines size={36} className={`text-primary ${speaking ? "pulse-ring" : ""}`} />
              </div>
            </div>
          </div>
          {/* Current question */}
          <div className="p-6 z-10 bg-surface-container/50 border-t border-white/5">
            <p className="label-caps text-primary mb-2">
              Question {questionIndex + 1} of {total}
            </p>
            <p className="text-body-md text-on-surface-variant italic">&ldquo;{question}&rdquo;</p>
          </div>
        </section>

        {/* Candidate */}
        <section className="flex-1 glass-panel rounded-xl flex flex-col relative overflow-hidden glow-hover min-h-[320px]">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover ${camOn ? "opacity-60" : "opacity-0"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
          <div className="p-6 z-10 flex justify-between items-start">
            <div>
              <h2 className="text-headline-md text-on-surface drop-shadow-md">
                {user?.firstName ?? interview.candidateName}
              </h2>
              <p className="label-caps text-on-surface-variant mt-2 drop-shadow-md">Candidate</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={toggleCamera}
                aria-label={camOn ? "Turn camera off" : "Turn camera on"}
                className="bg-surface-container-high/80 backdrop-blur-md p-2 rounded-md border border-white/10 text-on-surface hover:bg-surface-container-highest transition-colors"
              >
                {camOn ? <Video size={20} /> : <VideoOff size={20} />}
              </button>
              <button
                onClick={() => setMicOn((m) => !m)}
                aria-label={micOn ? "Mute microphone" : "Unmute microphone"}
                className="bg-surface-container-high/80 backdrop-blur-md p-2 rounded-md border border-white/10 text-on-surface hover:bg-surface-container-highest transition-colors"
              >
                {micOn ? <Mic size={20} /> : <MicOff size={20} />}
              </button>
            </div>
          </div>

          {/* Answer area */}
          <div className="mt-auto p-6 z-10 flex flex-col gap-3">
            <label htmlFor="answer" className="label-caps text-on-surface-variant">
              Your Answer (notes / transcript)
            </label>
            <textarea
              id="answer"
              value={answers[questionIndex] ?? ""}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Speak out loud, then capture the key points of your answer here…"
              rows={4}
              className="w-full bg-surface-container-low/80 backdrop-blur-md border border-white/10 rounded-md py-3 px-4 text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all resize-none"
            />
            <div className="flex justify-between items-center">
              <button
                onClick={() => setQuestionIndex((i) => Math.max(0, i - 1))}
                disabled={questionIndex === 0}
                className="flex items-center gap-1 text-on-surface-variant hover:text-primary disabled:opacity-30 disabled:pointer-events-none transition-colors text-body-sm font-bold"
              >
                <ChevronLeft size={18} /> Previous
              </button>
              <div className="flex gap-1.5">
                {interview.questions.map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === questionIndex ? "bg-primary" : (answers[i] ?? "").trim() ? "bg-primary/50" : "bg-white/15"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setQuestionIndex((i) => Math.min(total - 1, i + 1))}
                disabled={questionIndex === total - 1}
                className="flex items-center gap-1 text-on-surface-variant hover:text-primary disabled:opacity-30 disabled:pointer-events-none transition-colors text-body-sm font-bold"
              >
                Next <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* End interview — coral reserved for destructive actions */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
          <button
            onClick={handleEnd}
            disabled={ending}
            className="bg-secondary text-on-secondary font-semibold text-headline-md px-8 py-4 rounded-full shadow-lg hover:opacity-90 active:scale-95 transition-all flex items-center gap-3 disabled:opacity-60"
          >
            {ending ? <Loader2 size={24} className="animate-spin" /> : <PhoneOff size={24} />}
            {ending ? "Generating feedback…" : "End Interview"}
          </button>
        </div>
      </main>
    </div>
  );
}
