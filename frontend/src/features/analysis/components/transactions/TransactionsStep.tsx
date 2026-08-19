import { Info, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import Button from "../../../../components/ui/Button";
import type { AnalysisDraftFormValues } from "../../schemas/analysis.schema";
import type { AnalysisTransactionDraftItem } from "../../types/analysis-draft";
import TransactionDialog from "./TransactionDialog";
import TransactionsSummary from "./TransactionsSummary";
import TransactionsTable from "./TransactionsTable";
import "./TransactionsStep.css";

const createTransactionId = (): string => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `transaction-${Date.now()}-${Math.round(Math.random() * 100000)}`;
};

function TransactionsStep() {
  const {
    control,
    clearErrors,
    formState: { errors },
  } = useFormContext<AnalysisDraftFormValues>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<AnalysisTransactionDraftItem | null>(null);
  const [editingTransactionIndex, setEditingTransactionIndex] = useState<number | null>(null);

  const { append, update, remove } = useFieldArray({
    control,
    name: "transactions",
  });

  const transactions = useWatch({
    control,
    name: "transactions",
  }) ?? [];

  const transactionsError = useMemo(() => {
    if (!errors.transactions || Array.isArray(errors.transactions)) {
      return undefined;
    }

    return errors.transactions.message;
  }, [errors.transactions]);

  const openCreateDialog = () => {
    setEditingTransaction(null);
    setEditingTransactionIndex(null);
    setDialogOpen(true);
  };

  const openEditDialog = (index: number, transaction: AnalysisTransactionDraftItem) => {
    setEditingTransactionIndex(index);
    setEditingTransaction(transaction);
    setDialogOpen(true);
  };

  const handleSubmitTransaction = (
    values: Omit<AnalysisTransactionDraftItem, "id" | "categoryLabel">,
  ) => {
    if (editingTransaction && editingTransactionIndex !== null) {
      update(editingTransactionIndex, {
        ...editingTransaction,
        ...values,
      });
    } else {
      append({
        id: createTransactionId(),
        ...values,
      });
    }

    clearErrors("transactions");
    setEditingTransaction(null);
    setEditingTransactionIndex(null);
  };

  const handleRemoveTransaction = (index: number) => {
    remove(index);
  };

  return (
    <div className="transactions-step">
      <section className="analysis-card analysis-card--transactions">
        <div className="analysis-card__section-header">
          <p className="analysis-card__eyebrow">TRANSACCIONES</p>
          <h2>Ahora cargá tus consumos y movimientos recientes.</h2>
          <p>
            Agregá al menos 3 transacciones válidas para continuar a la revisión
            del análisis.
          </p>
        </div>

        <div className="transactions-step__layout">
          <div className="transactions-step__main">
            <div className="analysis-card__header">
              <div className="analysis-card__header--stacked">
                <h3>2. Transacciones</h3>
                <p>Podés sumar compras, pagos, ingresos o transferencias recientes.</p>
              </div>

              <Button type="button" variant="secondary" onClick={openCreateDialog}>
                <Plus size={16} aria-hidden="true" />
                Nueva transacción
              </Button>
            </div>

            <TransactionsTable
              transactions={transactions}
              error={typeof transactionsError === "string" ? transactionsError : undefined}
              onEdit={openEditDialog}
              onRemove={handleRemoveTransaction}
              onCreate={openCreateDialog}
            />

            <section className="analysis-banner" aria-label="Información sobre clasificación">
              <p className="analysis-banner__copy">
                <Info size={16} aria-hidden="true" />
                <span>
                  Las categorías se asignarán automáticamente durante el análisis.
                  Podrás revisarlas cuando el análisis esté disponible.
                </span>
              </p>
            </section>
          </div>

          <aside className="transactions-step__sidebar">
            <TransactionsSummary transactions={transactions} />
          </aside>
        </div>
      </section>

      <TransactionDialog
        open={dialogOpen}
        mode={editingTransaction ? "edit" : "create"}
        transaction={editingTransaction}
        onOpenChange={(open) => {
          setDialogOpen(open);

          if (!open) {
            setEditingTransaction(null);
            setEditingTransactionIndex(null);
          }
        }}
        onSubmit={handleSubmitTransaction}
      />
    </div>
  );
}

export default TransactionsStep;
