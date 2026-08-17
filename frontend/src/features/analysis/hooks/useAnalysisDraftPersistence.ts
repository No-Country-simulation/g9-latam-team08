import { useEffect, useRef } from "react";
import { useWatch, type Control, type UseFormReset } from "react-hook-form";
import type { AnalysisDraftFormValues } from "../schemas/analysis.schema";
import type { AnalysisDraft } from "../types/analysis-draft";
import { clearDraft, saveDraft } from "../utils/draftStorage";

interface UseAnalysisDraftPersistenceParams {
  control: Control<AnalysisDraftFormValues>;
  reset: UseFormReset<AnalysisDraftFormValues>;
  userId: string;
  emptyDraft: AnalysisDraftFormValues;
  defaultValues: AnalysisDraftFormValues;
}

interface UseAnalysisDraftPersistenceResult {
  resetDraftState: () => void;
}

export function useAnalysisDraftPersistence({
  control,
  userId,
  defaultValues,
}: UseAnalysisDraftPersistenceParams): UseAnalysisDraftPersistenceResult {
  const watchedDraft = useWatch({ control });
  const lastSavedDraftRef = useRef(JSON.stringify(defaultValues));
  const suppressNextAutosaveRef = useRef(false);

  useEffect(() => {
    if (!watchedDraft) {
      return;
    }

    const serializedDraft = JSON.stringify(watchedDraft);

    if (serializedDraft === lastSavedDraftRef.current) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      if (suppressNextAutosaveRef.current) {
        suppressNextAutosaveRef.current = false;
        lastSavedDraftRef.current = serializedDraft;
        return;
      }

      saveDraft(userId, watchedDraft as AnalysisDraft);
      lastSavedDraftRef.current = serializedDraft;
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [userId, watchedDraft]);

  const resetDraftState = () => {
    suppressNextAutosaveRef.current = true;
    clearDraft(userId);
  };

  return {
    resetDraftState,
  };
}
