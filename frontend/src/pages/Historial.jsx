import { useEffect, useState } from "react";
import { getUserTransactions, deleteTransaction } from "../api/transactions";
import "./Historial.css";

function Historial() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTransactions = async () => {
    setLoading(true);
    const data = await getUserTransactions();
    setTransactions(data);
    setLoading(false);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar esta transacción?")) return;
    const success = await deleteTransaction(id);
    if (success) {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="historial-page">
        <h2>Historial de transacciones</h2>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="historial-page">
      <h2>Historial de transacciones</h2>

      {transactions.length === 0 ? (
        <p className="historial-empty">No hay transacciones registradas todavía.</p>
      ) : (
        <div className="historial-table-wrapper">
          <table className="historial-table">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Monto</th>
                <th>Categoría</th>
                <th>Tipo</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td className="historial-desc">{t.nombre_tienda}</td>
                  <td className={t.type === "INCOME" ? "historial-income" : "historial-expense"}>
                    {formatCurrency(t.monto)}
                  </td>
                  <td>
                    <span className="historial-badge">{t.categoria_principal}</span>
                  </td>
                  <td>{t.type === "INCOME" ? "Ingreso" : "Gasto"}</td>
                  <td>{formatDate(t.fecha)}</td>
                  <td>
                    <button
                      className="historial-delete-btn"
                      onClick={() => handleDelete(t.id)}
                      title="Eliminar"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Historial;
