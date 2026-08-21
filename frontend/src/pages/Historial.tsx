import { useState, useEffect } from "react";
import { Transaction } from "../types/transaction-type";
import Button from "../components/ui/Button";
import FiltrosHistorial from "../features/dashboard/components/FiltrosHistorial";
import ResumenFinanciero from "../features/dashboard/components/ResumenFinanciero";
import TablaTransacciones from "../features/dashboard/components/TablaTransacciones2";
import { ModalEditar } from "../features/dashboard/components/ModalEditar";
import { exportarTransaccionesPDF } from "../utils/exportUtils";

export default function Historial() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("Todos");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [selectedType, setSelectedType] = useState<string>("Todos");
  const [selectedAccount, setSelectedAccount] = useState<string>("Principal");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [transaccionEditando, setTransaccionEditando] = useState<Transaction | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("jwt_token");
        const response = await fetch("http://localhost:8080/api/transactions", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data: Transaction[] = await response.json();
        console.log("1. Datos crudos desde MySQL:", data);
        setTransactions(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("No pudimos conectar con el servidor de FinanceAI, mostrando datos de prueba.");
        // DATOS DE PRUEBA (Fallback)
        setTransactions([
          { id: "1", description: "Compras Supermercado DIA", amount: 24500, date: "2024-05-19", category: "Comida", type: "expense", account: "Principal" },
          { id: "2", description: "Pago de Internet", amount: 15000, date: "2024-05-18", category: "Servicios", type: "expense", account: "Principal" },
          { id: "3", description: "Sueldo Hackathon", amount: 850000, date: "2024-05-01", category: "Todos", type: "income", account: "Principal" },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // ==========================================
  // ESTADO DERIVADO: Filtros
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
  // ESTADO DERIVADO: Matemáticas
  // ==========================================
  const ingresosTotales = transaccionesFiltradas
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const egresosTotales = transaccionesFiltradas
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  // ==========================================
  // MANEJADORES DE ACCIONES
  // ==========================================
  const handleDelete = async (id: string) => {
    const confirmar = window.confirm("¿Estás seguro de que querés eliminar este movimiento?");
    if (!confirmar) return;

    try {
      const token = localStorage.getItem("jwt_token");
      const response = await fetch(`http://localhost:8080/api/transactions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setTransactions((prevTransactions) => prevTransactions.filter((t) => t.id !== id));
        console.log("¡Transacción eliminada con éxito!");
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

  const handleExport = async () => {
    try {
      await exportarTransaccionesPDF(transaccionesFiltradas);
    } catch (error) {
      console.error("Error al exportar el PDF:", error);
    }
  };

  const handleGuardarEdicion = async (datosModificados: any) => {
    console.log("A. Estado 'transaccionEditando' original:", transaccionEditando);
    console.log("B. Datos 'datosModificados' que devolvió el Modal:", datosModificados);

    try {
      const token = localStorage.getItem("jwt_token");
      const idTransaccion = datosModificados.id || transaccionEditando?.id;

      if (!idTransaccion) {
        alert("Fallo crítico: El ID se perdió. Mirá la consola de F12 para ver qué tienen los objetos A y B.");
        return;
      }

      console.log("C. ¡ID encontrado! Enviando PUT a:", `http://localhost:8080/api/transactions/${idTransaccion}`);

      const response = await fetch(`http://localhost:8080/api/transactions/${idTransaccion}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...datosModificados, id: idTransaccion }),
      });

      if (response.ok) {
        const transaccionActualizada = await response.json();
        setTransactions((prev) => prev.map((t) => (t.id === transaccionActualizada.id ? transaccionActualizada : t)));
        setModalAbierto(false);
        console.log("¡Actualización exitosa!");
      } else {
        const errorText = await response.text();
        console.error(`Error del servidor (Status ${response.status}):`, errorText);
        alert(`Fallo en el servidor: HTTP ${response.status}`);
      }
    } catch (error) {
      console.error("Error de red al actualizar:", error);
    }
  };

  // ==========================================
  // RENDERIZADO
  // ==========================================
  if (isLoading) {
    return <div style={{ padding: "3rem", textAlign: "center" }}>Cargando panel financiero...</div>;
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
      {/* Cabecera */}
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", margin: "0 0 0.5rem 0" }}>
          Historial Financiero
        </h1>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          <p style={{ margin: 0, color: "#4b5563" }}>
            Revisá tus movimientos, editá registros y exportá el listado filtrado cuando lo necesites.
          </p>
          <Button variant="secondary" onClick={() => void handleExport()}>
            Exportar PDF
          </Button>
        </div>
        {error && <p style={{ color: "#ef4444", fontSize: "0.875rem" }}>{error}</p>}
      </header>

      {/* Filtros */}
      <FiltrosHistorial
        searchTerm={searchTerm} onSearchChange={setSearchTerm}
        selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod}
        selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory}
        selectedType={selectedType} onTypeChange={setSelectedType}
        selectedAccount={selectedAccount} onAccountChange={setSelectedAccount}
      />

      {/* Resumen */}
      <div style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}>
        <ResumenFinanciero
          ingresosTotales={ingresosTotales}
          egresosTotales={egresosTotales}
        />
      </div>

      {/* Tabla */}
      <TablaTransacciones
        transacciones={transaccionesFiltradas}
        onEdit={handleClickEditar}
        onDelete={handleDelete}
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
