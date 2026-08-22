export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;       // Formato ISO: "2024-05-19"
  category: string;   // Ej: "Alimentación", "Transporte"
  type: 'income' | 'expense';
  account: string;    // Ej: "Principal", "Ahorros" (Nuevo campo según tu diseño)
}

export interface FiltrosHistorialProps {
  // Búsqueda de texto
  searchTerm: string;
  onSearchChange: (term: string) => void;

  // Dropdown de Período (Ej: "Este mes")
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;

  // Píldoras de Categoría
  selectedCategory: string;
  onCategoryChange: (category: string) => void;

  // Dropdown de Tipo (Ingreso/Egreso/Todos)
  selectedType: string;
  onTypeChange: (type: string) => void;

  // Píldoras de Cuenta (Principal/Ahorros)
  selectedAccount: string;
  onAccountChange: (account: string) => void;
}

export interface ResumenFinancieroProps {
  ingresosTotales: number;
  egresosTotales: number;
}


export interface TablaTransaccionesProps {
  transacciones: Transaction[]; // Recibe el arreglo ya filtrado
  onEdit: (transaccion: Transaction) => void;
  onDelete: (id: string) => void;
}


export interface FilaTransaccionProps {
  transaccion: Transaction; // Recibe una sola transacción
  onEdit: (transaccion: Transaction) => void;
  onDelete: (id: string) => void;
}

export interface PieDeTablaProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;           // Para mostrar "Mostrando 1-20 de 150"
  itemsPerPage: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onExport: () => void;         // Gatillo para el botón "Exportar Datos"
}
