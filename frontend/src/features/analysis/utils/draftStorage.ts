import { analysisDraftSchema } from "../schemas/analysis.schema";
import type { AnalysisDraft } from "../types/analysis-draft";

const STORAGE_KEY_PREFIX = "financeai:new-analysis-draft";

const isStorageAvailable = (): boolean => {
  try {
    return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
  } catch {
    return false;
  }
};

export const getDraftStorageKey = (userId: string): string =>
  `${STORAGE_KEY_PREFIX}:${userId}`;

export const loadDraft = (userId: string): AnalysisDraft | null => {
  if (!isStorageAvailable()) {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(getDraftStorageKey(userId));
    if (!rawValue) {
      return null;
    }

    const parsedValue = JSON.parse(rawValue);
    const validationResult = analysisDraftSchema.safeParse(parsedValue);

    if (!validationResult.success) {
      return null;
    }

    return validationResult.data;
  } catch {
    return null;
  }
};

export const saveDraft = (userId: string, draft: AnalysisDraft): void => {
  if (!isStorageAvailable()) {
    return;
  }

  try {
    window.localStorage.setItem(getDraftStorageKey(userId), JSON.stringify(draft));
  } catch {
    // Ignorado intencionalmente para no romper el flujo si storage no estÃ¡ disponible.
  }
};

export const clearDraft = (userId: string): void => {
  if (!isStorageAvailable()) {
    return;
  }

  try {
    window.localStorage.removeItem(getDraftStorageKey(userId));
  } catch {
    // Ignorado intencionalmente para no romper el flujo si storage no estÃ¡ disponible.
  }
};
