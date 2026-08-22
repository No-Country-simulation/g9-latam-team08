const DEFAULT_API_BASE_URL = "/backend";

export const env = {
  apiBaseUrl:
    import.meta.env.VITE_API_BASE_URL?.trim() ||
    DEFAULT_API_BASE_URL,

  geminiApiKey:
    import.meta.env.VITE_GEMINI_API_KEY ?? "",
};
