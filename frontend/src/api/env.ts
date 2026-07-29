const DEFAULT_API_BASE_URL = "http://localhost:8080";

export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL,
  geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY ?? "",
};
