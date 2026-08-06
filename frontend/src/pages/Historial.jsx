import { useState } from "react";
import "./Historial.css";

// 1. Datos de prueba (Mock Data)
// Cuando conectes el backend, estos datos vendrán de tu base de datos o API.
const mockTransactions = [
  { id: 't1', date: '2026-08-01', description: 'Salario Mensual', amount: 1500000, type: 'income', category: 'Sueldo' },
  { id: 't2', date: '2026-08-02', description: 'Supermercado Vea', amount: 45000, type: 'expense', category: 'Alimentación' },
  { id: 't3', date: '2026-08-03', description: 'Transferencia a Juan', amount: 15000, type: 'expense', category: 'Transferencias' },
  { id: 't4', date: '2026-08-04', description: 'Venta bicicleta', amount: 120000, type: 'income', category: 'Ventas' },
  { id: 't5', date: '2026-08-05', description: 'Suscripción Netflix', amount: 7500, type: 'expense', category: 'Entretenimiento' },
];

export default function Historial() {
  // 2. Estados (State) del componente
  // Aquí guardamos lo que el usuario escribe en el buscador y el filtro seleccionado.
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'income', 'expense'

  // 3. Lógica de filtrado
  // Cada vez que cambia el buscador o el filtro, esta constante se recalcula automáticamente.
  const filteredTransactions = mockTransactions.filter((transaction) => {
    // Filtrar por texto (descripción)
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Filtrar por tipo (ingreso/gasto)
    const matchesType = filterType === 'all' || transaction.type === filterType;

    return matchesSearch && matchesType;
  });

  // Función auxiliar para formatear la moneda (Pesos Argentinos en este caso)
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Función auxiliar para formatear la fecha
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-AR', options);
  };

  return (
    <div className="historial-container">
      <div className="cabecera-historial">
        <div>
          <h1>Historial de Transacciones</h1>
          <p>Revisa todos tus ingresos y egresos recientes.</p>
        </div>
      </div>

      <div className="tarjeta historial-toolbar">
        <div className="historial-search-wrapper">
          <input
            type="text"
            placeholder="Buscar por descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="historial-input"
          />
          <svg className="historial-search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div className="historial-filter-group">
          <button
            type="button"
            onClick={() => setFilterType("all")}
            className={`historial-filter-button ${filterType === "all" ? "historial-filter-button-active" : ""}`}
          >
            Todas
          </button>
          <button
            type="button"
            onClick={() => setFilterType("income")}
            className={`historial-filter-button ${filterType === "income" ? "historial-filter-button-active historial-filter-button-income-active" : ""}`}
          >
            Ingresos
          </button>
          <button
            type="button"
            onClick={() => setFilterType("expense")}
            className={`historial-filter-button ${filterType === "expense" ? "historial-filter-button-active historial-filter-button-expense-active" : ""}`}
          >
            Gastos
          </button>
        </div>
      </div>

      <div className="tarjeta historial-list-card">
        {filteredTransactions.length > 0 ? (
          <ul className="historial-list">
            {filteredTransactions.map((transaction) => (
              <li key={transaction.id} className="historial-list-item">
                <div className="historial-item-main">
                  <div className={`historial-item-icon ${transaction.type === "income" ? "historial-icon-income" : "historial-icon-expense"}`}>
                    {transaction.type === "income" ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    )}
                  </div>

                  <div className="historial-item-details">
                    <p className="historial-item-description">{transaction.description}</p>
                    <div className="historial-item-meta">
                      <span>{formatDate(transaction.date)}</span>
                      <span className="historial-item-meta-separator">•</span>
                      <span>{transaction.category}</span>
                    </div>
                  </div>
                </div>

                <div className="historial-amount-cell">
                  <p className={`historial-amount ${transaction.type === "income" ? "historial-amount-positive" : "historial-amount-negative"}`}>
                    {transaction.type === "income" ? "+" : "-"} {formatCurrency(transaction.amount)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="historial-empty-state">
            <svg className="historial-empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="historial-empty-title">No se encontraron transacciones</p>
            <p className="historial-empty-description">Intenta ajustar tu búsqueda o filtros.</p>
          </div>
        )}
      </div>
    </div>
  );
}
