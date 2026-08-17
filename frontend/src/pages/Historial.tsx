import { useState, useEffect } from "react";
import { Transaction } from "../types/transaction-type";

import FiltrosHistorial from "../components/historial/FiltrosHistorial";
import ResumenFinanciero from "../components/historial/ResumenFinanciero";
import TablaTransacciones from "../components/historial/TablaTransacciones";
import { exportarTransaccionesPDF } from "../utils/exportUtils";
import { ModalEditar } from "../components/historial/ModalEditar";

export default function Historial() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [selectedType, setSelectedType] = useState<string>("Todos");
  const [selectedAccount, setSelectedAccount] = useState<string>("Principal");

  const [modalAbierto, setModalAbierto] = useState(false);
  const [transaccionEditando, setTransaccionEditando] = useState<Transaction | null>(null);


  // ==========================================
  // NUEVO: ESTADOS DE PAGINACIÓN
  // ==========================================
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5; // Podés cambiar esto a 10 o 20 según prefieras

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('jwt_token');

        const response = await fetch(`http://localhost:8080/api/transactions`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
          }
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data: Transaction[] = await response.json();
        setTransactions(data);
        setError(null);

      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("No pudimos conectar con el servidor de FinanceAI, mostrando datos de prueba.");

        setTransactions([
          { id: "1", description: "Compras Supermercado DIA", amount: 24500, date: "2024-05-19", category: "Comida", type: "expense", account: "Principal" },
          { id: "2", description: "Pago de Internet", amount: 15000, date: "2024-05-18", category: "Servicios", type: "expense", account: "Principal" },
          { id: "3", description: "Sueldo Hackathon", amount: 850000, date: "2024-05-01", category: "Todos", type: "income", account: "Principal" },
           { id: "4", description: "Compras Supermercado DIA", amount: 24500, date: "2024-05-19", category: "Comida", type: "expense", account: "Principal" },
          { id: "5", description: "Pago de Internet", amount: 15000, date: "2024-05-18", category: "Servicios", type: "expense", account: "Principal" },
          { id: "6", description: "Sueldo Hackathon", amount: 850000, date: "2024-05-01", category: "Todos", type: "income", account: "Principal" },
          { id: "7", description: "Pago de Internet", amount: 15000, date: "2024-05-18", category: "Servicios", type: "expense", account: "Principal" },
          { id: "8", description: "Sueldo Hackathon", amount: 850000, date: "2024-05-01", category: "Todos", type: "income", account: "Principal" }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // ==========================================
  // NUEVO: RESETEO DE PÁGINA AL FILTRAR
  // Si busco algo, quiero volver a la página 1 automáticamente
  // ==========================================
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedType, selectedAccount]);

  // ==========================================
  // 4. ESTADO DERIVADO: FILTROS
  // ==========================================
  const transaccionesFiltradas = transactions.filter((t) => {
    const desc = t.description || "";
    const cat = t.category || "";
    const acc = t.account || "";

    const matchSearch = desc.toLowerCase().includes((searchTerm || "").toLowerCase());
    const matchCategory = selectedCategory === "Todos" || cat === selectedCategory;
    const matchAccount = acc === selectedAccount;

    let matchType = true;
    if (selectedType === "Ingresos") matchType = t.type === "income";
    if (selectedType === "Egresos") matchType = t.type === "expense";

    return matchSearch && matchCategory && matchAccount && matchType;
  });

  // ==========================================
  // NUEVO: ESTADO DERIVADO - MATEMÁTICAS DE PAGINACIÓN
  // ==========================================
  const totalItems = transaccionesFiltradas.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  // Cortamos el array gigante para pasarle solo los 5 elementos correspondientes a la tabla
  const transaccionesPaginadas = transaccionesFiltradas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleExport = () => {
    exportarTransaccionesPDF(transaccionesFiltradas);
  };

  // ==========================================
  // 5. ESTADO DERIVADO: MATEMÁTICAS (Mantiene el total general de los filtros)
  // ==========================================
  const ingresosTotales = transaccionesFiltradas
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const egresosTotales = transaccionesFiltradas
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  // ==========================================
  // 6. MANEJADORES DE ACCIONES
  // ==========================================
  const handleDelete = async (id: string | number) => {
    const confirmar = window.confirm("¿Estás seguro de que querés eliminar este movimiento?");
    if (!confirmar) return;

    try {
      const token = localStorage.getItem('jwt_token');
      const response = await fetch(`http://localhost:8080/api/transactions/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setTransactions(prevTransactions => prevTransactions.filter(t => t.id !== id));
      } else {
        alert("Hubo un error al intentar eliminar la transacción.");
      }
    } catch (error) {
      console.error("Problema de red al eliminar:", error);
    }
  };

  const handleClickEditar = (transaccion: Transaction) => {
    setTransaccionEditando(transaccion);
    setModalAbierto(true);
  };

  const handleGuardarEdicion = async (datosModificados: any) => {
    try {
      const token = localStorage.getItem('jwt_token');
      const idTransaccion = datosModificados.id || transaccionEditando?.id;

      if (!idTransaccion) {
        alert("Fallo crítico: El ID se perdió.");
        return;
      }

      const response = await fetch(`http://localhost:8080/api/transactions/${idTransaccion}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...datosModificados, id: idTransaccion })
      });

      if (response.ok) {
        const transaccionActualizada = await response.json();
        setTransactions(prev => prev.map(t => t.id === transaccionActualizada.id ? transaccionActualizada : t));
        setModalAbierto(false);
      } else {
        alert(`Fallo en el servidor: HTTP ${response.status}`);
      }
    } catch (error) {
      console.error("Error de red al actualizar:", error);
    }
  };

  // ==========================================
  // 7. RENDERIZADO DEL DASHBOARD
  // ==========================================
  if (isLoading) {
    return <div style={{ padding: '3rem', textAlign: 'center' }}>Cargando panel financiero...</div>;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>

      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0' }}>Historial Financiero</h1>
        {error && <p style={{ color: '#ef4444', fontSize: '0.875rem' }}>{error}</p>}
      </header>

      <FiltrosHistorial
        searchTerm={searchTerm} onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory}
        selectedType={selectedType} onTypeChange={setSelectedType}
        selectedAccount={selectedAccount} onAccountChange={setSelectedAccount}
      />

      <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
        <ResumenFinanciero
          ingresosTotales={ingresosTotales}
          egresosTotales={egresosTotales}
        />
      </div>

      {/* Le pasamos transaccionesPaginadas a la tabla y las props para el Pie */}
      <TablaTransacciones
        transacciones={transaccionesPaginadas}
        onEdit={handleClickEditar}
        onDelete={handleDelete}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
        onExport={handleExport}
      />

      <ModalEditar
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        transaccion={transaccionEditando}
        onGuardar={handleGuardarEdicion}
      />

    </div>
  );
}
