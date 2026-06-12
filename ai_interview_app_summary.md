# 🤖 INTER-V — AI Mock Interview Platform Summary

> **Video:** [Full Stack AI App: Build a Real-Time Voice Agent Interview Platform](https://youtu.be/8GK8R77Bd7g)
> **Channel:** JavaScript Mastery (Adrian Hajdin)
> **GitHub Repo:** [adrianhajdin/ai_mock_interviews](https://github.com/adrianhajdin/ai_mock_interviews)

---

## 📌 What is Prepwise?

**Prepwise** is a full-stack, AI-powered job interview preparation platform. It uses real-time voice agents to conduct mock job interviews and then provides AI-generated feedback to the user. The platform is designed to simulate a realistic interview experience and help users prepare for technical and behavioral job interviews.

---

## ⚙️ Tech Stack

| Technology              | Role                                                          |
| ----------------------- | ------------------------------------------------------------- |
| **Next.js**       | Full-stack framework (UI + API routes/server actions)         |
| **Firebase**      | Authentication (email/password) + Firestore database          |
| **Tailwind CSS**  | Styling and responsive design                                 |
| **shadcn/ui**     | Prebuilt accessible UI component library                      |
| **Vapi AI**       | Voice agent SDK — powers the real-time voice interviews      |
| **Google Gemini** | LLM used to generate interview questions and evaluate answers |
| **Zod**           | Schema validation for forms and API inputs                    |

---

## 🔋 Core Features

### 1. 🔐 Authentication

- Email/password Sign Up and Sign In
- Powered by **Firebase Authentication**
- Session management handled server-side via Firebase Admin SDK

### 2. 🎙️ AI Voice Interview (The Core Feature)

- Uses **Vapi AI** voice agents to conduct the interview in real-time
- The user speaks their answers out loud; the AI listens and responds
- Vapi handles speech-to-text and text-to-speech seamlessly
- A Vapi **Workflow** (configured on the Vapi dashboard) controls the interview flow

### 3. 📝 Interview Generation

- Users provide job role, tech stack, and experience level
- **Google Gemini** generates a set of relevant interview questions based on those inputs
- Questions are stored in **Firestore** and tied to the user

### 4. 💬 AI Feedback After Interview

- After the interview session ends, the full conversation transcript is sent to **Google Gemini**
- Gemini evaluates answers and returns structured feedback:
  - Overall score
  - Category scores (communication, technical knowledge, problem-solving, etc.)
  - Strengths
  - Areas for improvement
  - Final assessment
- Feedback is saved to Firestore and displayed on a results page

### 5. 📊 Dashboard

- Lists all interviews the user has created
- Shows interview status and scores
- Allows users to retake or review past interviews

### 6. 📄 Interview Detail / Results Page

- Displays the full AI feedback report
- Shows score breakdowns per category
- Includes the interview transcript

### 7. 📱 Fully Responsive Design

- Works across desktop, tablet, and mobile
- Dark-themed, modern UI using custom Tailwind tokens and the **Mona Sans** font

---

## 🏗️ Project Architecture & Structure

```
ai_mock_interviews/
├── app/                     # Next.js App Router pages
│   ├── (auth)/              # Sign-in / Sign-up pages (route group)
│   ├── (root)/              # Main app pages (protected)
│   │   ├── page.tsx         # Dashboard / Home
│   │   └── interview/
│   │       ├── [id]/        # Interview session page
│   │       └── [id]/feedback/ # Feedback/results page
│   └── api/                 # API routes (e.g., Vapi webhook)
├── components/              # Reusable UI components
│   ├── Agent.tsx            # The Vapi voice agent component
│   ├── InterviewCard.tsx    # Card showing interview summary
│   └── AuthForm.tsx        # Sign-in/Sign-up form
├── lib/
│   ├── actions/             # Next.js Server Actions
│   │   ├── auth.action.ts   # Login, signup, session management
│   │   └── general.action.ts # Interview creation, fetching, feedback
│   ├── firebase/
│   │   ├── client.ts        # Firebase client SDK init
│   │   └── admin.ts         # Firebase Admin SDK init (server-side)
│   └── utils.ts             # Utility functions
├── firebase.ts              # Firebase client config
└── .env.local               # Environment variables (not committed)
```

---

## 🔑 Environment Variables Required

```env
# Vapi
NEXT_PUBLIC_VAPI_WEB_TOKEN=        # Vapi public web token
NEXT_PUBLIC_VAPI_WORKFLOW_ID=      # ID of the Vapi voice workflow

# Google Gemini
GOOGLE_GENERATIVE_AI_API_KEY=      # Gemini API key (Google AI Studio)

# App URL
NEXT_PUBLIC_BASE_URL=              # e.g. http://localhost:3000

# Firebase (Client-side)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase (Server-side Admin SDK)
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

---

## 🎨 Design System

- **Color palette**: Dark navy/purple tones (`dark-100`, `dark-200`, `dark-300`) with light accent colors (`light-100`, `light-400`, etc.)
- **Success/error colors**: Custom green and red tokens (`success-100`, `destructive-100`)
- **Primary accent**: Soft purple (`primary-100`, `primary-200`)
- **Font**: [Mona Sans](https://github.com/github/mona-sans) — a variable font
- **Theme**: Dark mode by default with full dark/light CSS variable support

---

## 🔄 How the Voice Interview Flow Works

```
1. User creates an interview → Gemini generates questions → Saved to Firestore
2. User starts interview → Vapi voice agent is initialized via SDK
3. Vapi fetches questions from the workflow config and begins the interview
4. The user speaks → Vapi does STT → passes to LLM → LLM responds → Vapi does TTS
5. Interview ends → transcript is retrieved
6. Transcript sent to Gemini → structured feedback generated
7. Feedback saved to Firestore → User redirected to results page
```

---

## 🚀 Key Concepts Taught in the Tutorial

1. **Next.js App Router** — layouts, route groups, server components, server actions
2. **Firebase Auth + Firestore** — setting up auth, reading/writing data, Admin SDK for server-side sessions
3. **Vapi SDK integration** — initializing voice agents, handling call events, workflows
4. **Google Gemini API** — structured output generation, prompt engineering for interviews and feedback
5. **Zod validation** — validating form inputs and API responses
6. **shadcn/ui** — using and customizing prebuilt components
7. **Full-stack patterns** — separating client vs server code, protecting routes, handling async data

---

## 📝 What You'll Need Before Building

- Firebase project (free tier works)
- Vapi account + configured voice workflow
- Google AI Studio API key (for Gemini)
- Node.js + npm installed locally

---

## 💡 Notes for Your Extended Build

Since you plan to build the same app and add features on top, here's what the base app does **NOT** include (common additions people make):

- Resume upload & parsing
- Job description input for tailored questions
- Difficulty level selector
- Timer during interview
- Video interview mode
- Leaderboard / progress tracking
- Email notifications after interview
- Multiple interview types (behavioral, technical, HR)
- Interview history analytics / charts
- Team/recruiter mode (interviewer side)
