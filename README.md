# Inter-V

AI-powered mock interview platform. Practice technical and behavioral interviews with an AI
mentor, get real-time voice sessions, and receive detailed feedback with category scores.

## Tech Stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **Convex** — realtime database and backend functions
- **Clerk** — authentication (email/password, Google, GitHub)
- **Tailwind CSS v4** — styled by the PrepWise Vision design system (`docs/design-system/`)
- **Vapi** — voice agent for live interviews (see `docs/VAPI_SETUP.md`)

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and fill in your keys (Clerk, Convex, Vapi).

3. In the Clerk dashboard, create a JWT template named `convex` (Configure → JWT Templates →
   New → Convex) so Convex can authenticate requests.

4. Run the backend and the app in two terminals:

   ```bash
   npx convex dev
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

## Project Structure

- `app/(auth)/` — sign-in, sign-up, forgot-password, SSO callback
- `app/(root)/` — dashboard, new interview, feedback report
- `app/(session)/` — fullscreen live interview room
- `convex/` — schema and backend functions (interviews, feedback)
- `components/` — UI components (AppShell, InterviewRoom, FeedbackReport, auth cards)
- `docs/design-system/` — design tokens and the canonical design spec from Stitch
- `docs/VAPI_SETUP.md` — how to enable real voice interviews
