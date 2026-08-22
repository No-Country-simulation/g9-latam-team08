export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  type: "income" | "expense";
  account: string;
}

export interface FiltrosHistorialProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;

  selectedCategory: string;
  onCategoryChange: (category: string) => void;

  selectedType: string;
  onTypeChange: (type: string) => void;

  selectedAccount: string;
  onAccountChange: (account: string) => void;
}

export interface ResumenFinancieroProps {
  ingresosTotales: number;
  egresosTotales: number;
}

export interface PieDeTablaProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onExport: () => void;
}

export interface TablaTransaccionesProps extends PieDeTablaProps {
  transacciones: Transaction[];
  onEdit: (transaccion: Transaction) => void;
  onDelete: (id: string) => void;
}

export interface FilaTransaccionProps {
  transaccion: Transaction;
  onEdit: (transaccion: Transaction) => void;
  onDelete: (id: string) => void;
}
