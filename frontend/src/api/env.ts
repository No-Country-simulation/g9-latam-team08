const DEFAULT_API_BASE_URL = "/api";

export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL,
  geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY ?? "",
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID ?? "",
};
