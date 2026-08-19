import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";

import "./GoalsDialogs.css";

interface GoalDialogShellProps {
  open: boolean;
  title: string;
  description: string;
  closeLabel: string;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  contentClassName?: string;
}

function GoalDialogShell({
  open,
  title,
  description,
  closeLabel,
  onOpenChange,
  children,
  contentClassName,
}: GoalDialogShellProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="analysis-dialog__overlay" />
        <Dialog.Content
          className={`analysis-dialog__content goals-dialog__content${
            contentClassName ? ` ${contentClassName}` : ""
          }`}
        >
          <div className="goals-dialog__layout">
            <div className="analysis-dialog__header">
              <div className="goals-dialog__header-copy">
              <Dialog.Title className="analysis-dialog__title">{title}</Dialog.Title>
              <Dialog.Description className="analysis-dialog__description">
                {description}
              </Dialog.Description>
              </div>

              <Dialog.Close asChild>
                <button type="button" className="analysis-dialog__close" aria-label={closeLabel}>
                  <X size={20} strokeWidth={2.6} aria-hidden="true" />
                </button>
              </Dialog.Close>
            </div>

            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default GoalDialogShell;
