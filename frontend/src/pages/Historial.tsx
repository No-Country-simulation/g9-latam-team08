import { useState, useEffect } from "react";
import { Transaction } from "../types/transaction-type";

// Importamos a nuestros "Hijos" desde la nueva carpeta
import FiltrosHistorial from "../components/historial/FiltrosHistorial";
import ResumenFinanciero from "../components/historial/ResumenFinanciero";
import TablaTransacciones from "../components/historial/TablaTransacciones";

export default function Historial() {
  // ==========================================
  // 1. ESTADOS DE LA BASE DE DATOS
  // ==========================================
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ==========================================
  // 2. ESTADOS DE LOS FILTROS
  // ==========================================
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [selectedType, setSelectedType] = useState<string>("Todos");
  const [selectedAccount, setSelectedAccount] = useState<string>("Principal");

  // ==========================================
  // 3. FETCH: OBTENER DATOS (Simulado/Real)
  // ==========================================
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userId = localStorage.getItem('userId') || '1';
        const response = await fetch(`http://localhost:8080/api/users/${userId}/transactions`);

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data: Transaction[] = await response.json();
        setTransactions(data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("No pudimos conectar con el servidor, mostrando datos de prueba.");

        // DATOS DE PRUEBA (Por si tu backend está apagado ahora mismo)
        setTransactions([
          { id: "1", description: "Compras Supermercado DIA", amount: 24500, date: "2024-05-19", category: "Comida", type: "expense", account: "Principal" },
          { id: "2", description: "Pago de Internet", amount: 15000, date: "2024-05-18", category: "Servicios", type: "expense", account: "Principal" },
          { id: "3", description: "Sueldo Hackathon", amount: 850000, date: "2024-05-01", category: "Todos", type: "income", account: "Principal" }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // ==========================================
  // 4. ESTADO DERIVADO: EL FILTRADO MÁGICO
  // ==========================================
  // Esto se recalcula automáticamente cada vez que un filtro cambia
  const transaccionesFiltradas = transactions.filter((t) => {
    const matchSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === "Todos" || t.category === selectedCategory;
    const matchAccount = t.account === selectedAccount;

    let matchType = true;
    if (selectedType === "Ingresos") matchType = t.type === "income";
    if (selectedType === "Egresos") matchType = t.type === "expense";

    return matchSearch && matchCategory && matchAccount && matchType;
  });

  // ==========================================
  // 5. ESTADO DERIVADO: MATEMÁTICAS
  // ==========================================
  const ingresosTotales = transaccionesFiltradas
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const egresosTotales = transaccionesFiltradas
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  // ==========================================
  // 6. MANEJADORES DE ACCIONES (Se los pasamos a la tabla)
  // ==========================================
  const handleEdit = (id: string) => {
    alert(`Lógica para editar la transacción con ID: ${id}`);
  };

  const handleDelete = (id: string) => {
    if(window.confirm("¿Estás seguro de eliminar este registro?")) {
      // Aquí iría tu fetch con método DELETE
      setTransactions(transactions.filter(t => t.id !== id));
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

      {/* Cabecera */}
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: '#111827', margin: '0 0 0.5rem 0' }}>
          Historial Financiero
        </h1>
        {error && <p style={{ color: '#ef4444', fontSize: '0.875rem' }}>{error}</p>}
      </header>

      {/* Componente 1: Filtros */}
      <FiltrosHistorial
        searchTerm={searchTerm} onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory}
        selectedType={selectedType} onTypeChange={setSelectedType}
        selectedAccount={selectedAccount} onAccountChange={setSelectedAccount}
      />

      {/* Componente 2: Cajas de Resumen Matemático */}
      <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
        <ResumenFinanciero
          ingresosTotales={ingresosTotales}
          egresosTotales={egresosTotales}
        />
      </div>

      {/* Componente 3: La Tabla de Datos */}
      <TablaTransacciones
        transacciones={transaccionesFiltradas}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

    </div>
  );
}
