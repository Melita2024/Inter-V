import Vapi from "@vapi-ai/web";

// Vapi voice-agent client. Returns null until NEXT_PUBLIC_VAPI_WEB_TOKEN is set
// in .env.local, so the app keeps working with the browser-TTS fallback.
let instance: Vapi | null = null;

export function getVapi(): Vapi | null {
  const token = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN;
  if (!token) return null;
  if (!instance) {
    instance = new Vapi(token);
  }
  return instance;
}

export const VAPI_WORKFLOW_ID = process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID;

export function isVapiConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN);
}
