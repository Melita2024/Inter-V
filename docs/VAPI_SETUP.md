# Vapi Voice Agent Setup

Inter-V uses [Vapi](https://vapi.ai) for real-time voice interviews. Until the keys below are
configured, the interview room falls back to browser text-to-speech + typed answers, so the app
works end-to-end without Vapi.

## 1. Get your keys

1. Create an account at [dashboard.vapi.ai](https://dashboard.vapi.ai).
2. **Public key** (safe for the browser): Dashboard → **Settings → API Keys** → copy the
   **Public Key**.
3. Create a **Workflow** (or an Assistant) for the interview flow: Dashboard → **Workflows** →
   Create. Configure the conversation nodes (greeting → ask questions → wrap-up). Copy its **ID**.

## 2. Where the keys go

Add them to `.env.local` (placeholders already exist at the bottom of the file):

```env
NEXT_PUBLIC_VAPI_WEB_TOKEN=pk_...        # the Public Key
NEXT_PUBLIC_VAPI_WORKFLOW_ID=...         # the Workflow/Assistant ID
```

Both are `NEXT_PUBLIC_` because the Vapi Web SDK runs in the browser and the public key is
designed to be exposed. **Never** put your Vapi *private* key in this file — if you later need
server-side Vapi calls (e.g. fetching call transcripts), store the private key as a Convex
environment variable (`npx convex env set VAPI_PRIVATE_KEY ...`) and call Vapi from a Convex
action.

## 3. Where it plugs into the code

- `lib/vapi.ts` — singleton client. `getVapi()` returns `null` when the token is missing, which
  is how the UI decides between real voice and the TTS fallback.
- `components/InterviewRoom.tsx` — the live session. To switch to Vapi:
  1. Replace the `SpeechSynthesisUtterance` effect with `getVapi()?.start(VAPI_WORKFLOW_ID, ...)`
     passing the interview questions as workflow variables.
  2. Subscribe to Vapi events: `call-start`, `speech-start`/`speech-end` (drive the orb's
     `speaking` state), `message` with `type: "transcript"` (fill the answers array), and
     `call-end`.
  3. On **End Interview**, call `vapi.stop()` and pass the collected transcript to the existing
     `api.interviews.complete` mutation.

## 4. Feedback generation

After Vapi is live, the transcript should be scored by an LLM instead of the current heuristic in
`convex/interviews.ts` (`scoreAnswers`). Recommended: a Convex action that sends the transcript to
Gemini or Claude with a structured-output prompt, then saves the result via an internal mutation.
That API key is also a Convex env var, never a `NEXT_PUBLIC_` one.
