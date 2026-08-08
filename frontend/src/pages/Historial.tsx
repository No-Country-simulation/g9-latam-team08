import { useState, useEffect } from "react";
import "./Historial.css";
import { Transaction } from "../types/financial-analysis";

export default function Historial() {

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('all');

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userId = localStorage.getItem('userId') || '1';
        const response = await fetch(`http://localhost:8080/api/transactions`);

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        // Le decimos a TypeScript que la respuesta será un arreglo de Transacciones
        const data: Transaction[] = await response.json();
        setTransactions(data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("Hubo un problema al cargar el historial.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType]);

  // Al usar TypeScript, sabe automáticamente que 'transaction' es de tipo Transaction
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || transaction.type === filterType;
    return matchesSearch && matchesType;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // Tipamos el parámetro amount como number
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Tipamos el parámetro dateString como string
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-AR', options);
  };

  if (isLoading) {
    return (
      <div className="historial-container">
        <div className="historial-empty-state">
          <p>Cargando transacciones...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="historial-container">
        <div className="historial-empty-state">
          <p style={{ color: '#dc2626' }}>{error}</p>
        </div>
      </div>
    );
  }

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
            // Aquí React ya infiere que 'e' es un ChangeEvent, pero es buena práctica tener el resto tipado
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
          <>
            <ul className="historial-list">
              {currentItems.map((transaction) => (
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

            {totalPages > 1 && (
              <div className="historial-paginacion">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="btn-paginacion"
                >
                  Anterior
                </button>
                <span className="info-paginacion">
                  Página {currentPage} de {totalPages}
                </span>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="btn-paginacion"
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
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
