import { useState, useEffect } from "react";
import { Transaction } from "../types/transaction-type";
import Button from "../components/ui/Button";

import FiltrosHistorial from "../components/historial/FiltrosHistorial";
import ResumenFinanciero from "../components/historial/ResumenFinanciero";
import TablaTransacciones from "../components/historial/TablaTransacciones";
import { ModalEditar } from "../components/historial/ModalEditar";
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
        // 1. Buscamos nuestro el Token
        const token = localStorage.getItem('jwt_token');

        const response = await fetch(`http://localhost:8080/api/transactions`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Enviamos el token para que Spring Boot nos deje pasar
            'Authorization': token ? `Bearer ${token}` : ''
          }
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
          { id: "3", description: "Sueldo Hackathon", amount: 850000, date: "2024-05-01", category: "Todos", type: "income", account: "Principal" }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // ==========================================
  // 4. ESTADO DERIVADO:
  // ==========================================
  const transaccionesFiltradas = transactions.filter((t) => {
    const desc = t.description || ""; // Protección contra null
    const cat = t.category || "";     // Protección contra null
    const acc = t.account || "";      // Protección contra null

    const matchSearch = desc.toLowerCase().includes((searchTerm || "").toLowerCase());
    const matchCategory = selectedCategory === "Todos" || cat === selectedCategory;
    const matchAccount = acc === selectedAccount;

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
  const handleDelete = async (id: string) => {
     // 1. Confirmación de seguridad
    const confirmar = window.confirm("¿Estás seguro de que querés eliminar este movimiento?");
    if (!confirmar) return;

    try {
      const token = localStorage.getItem('jwt_token');

      // 2. Petición al backend
      const response = await fetch(`http://localhost:8080/api/transactions/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        // 3. Actualizamos el estado filtrando la que borramos
        // Esto hace que desaparezca de la pantalla al instante sin recargar la página
        setTransactions(prevTransactions => prevTransactions.filter(t => t.id !== id));
        console.log("¡Transacción eliminada con éxito!");
      } else {
        alert("Hubo un error al intentar eliminar la transacción.");
      }
    } catch (error) {
      console.error("Problema de red al eliminar:", error);
    }
  };

  // Función para abrir el modal al hacer clic en "Editar"
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

  // Función que envía el PUT a Java (se la pasamos al Modal)
const handleGuardarEdicion = async (datosModificados: any) => {
    // 1. LOS DETECTORES DE MENTIRAS
    console.log("A. Estado 'transaccionEditando' original:", transaccionEditando);
    console.log("B. Datos 'datosModificados' que devolvió el Modal:", datosModificados);

    try {
      const token = localStorage.getItem('jwt_token');

      // 2. Intentamos rescatar el ID de cualquier lugar posible
      const idTransaccion = datosModificados.id || transaccionEditando?.id;

      if (!idTransaccion) {
        alert("Fallo crítico: El ID se perdió. Mirá la consola de F12 para ver qué tienen los objetos A y B.");
        return; // Cortamos acá para no romper nada
      }

      console.log("C. ¡ID encontrado! Enviando PUT a:", `http://localhost:8080/api/transactions/${idTransaccion}`);

      const response = await fetch(`http://localhost:8080/api/transactions/${idTransaccion}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        // Enviamos el objeto con el ID garantizado
        body: JSON.stringify({ ...datosModificados, id: idTransaccion })
      });

      if (response.ok) {
        const transaccionActualizada = await response.json();
        setTransactions(prev => prev.map(t => t.id === transaccionActualizada.id ? transaccionActualizada : t));
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
  // 7. RENDERIZADO DEL DASHBOARD
  // ==========================================
  if (isLoading) {
    return <div style={{ padding: '3rem', textAlign: 'center' }}>Cargando panel financiero...</div>;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>

      {/* Cabecera */}
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0' }}>
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
        {error && <p style={{ color: '#ef4444', fontSize: '0.875rem' }}>{error}</p>}
      </header>

      {/* Componente 1: Filtros */}
      <FiltrosHistorial
        searchTerm={searchTerm} onSearchChange={setSearchTerm}
        selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod}
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
