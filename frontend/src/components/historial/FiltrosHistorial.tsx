import { FiltrosHistorialProps } from "../types/transaction-type";
import "./FiltrosHistorial.css";

export default function FiltrosHistorial({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedType,
  onTypeChange,
  selectedAccount,
  onAccountChange
}: FiltrosHistorialProps) {


  const categorias = ["Todos", "Comida", "Transporte", "Servicios"];
  const tipos = ["Todos", "Ingresos", "Egresos"];
  const cuentas = ["Principal", "Ahorro"];

  return (
    <div className="filtros-contenedor">

      {/* Fila 1: Buscador */}
      <div className="filtro-buscador-wrapper">
        <label className="filtro-label">Buscar transacción</label>
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="filtro-input"
        />
      </div>

      {/* Fila 2: Categorías, Tipo y Cuenta */}
      <div className="filtros-grid">

        {/* Píldoras de Categoría */}
        <div className="filtro-grupo">
          <label className="filtro-label">Categoría</label>
          <div className="pildoras-lista">
            {categorias.map(cat => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`btn-pildora ${selectedCategory === cat ? 'activa' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dropdown de Tipo */}
        <div className="filtro-grupo">
          <label className="filtro-label">Tipo</label>
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="filtro-select"
          >
            {tipos.map(tipo => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </select>
        </div>

        {/* Píldoras de Cuenta */}
        <div className="filtro-grupo">
          <label className="filtro-label">Cuenta</label>
          <div className="pildoras-lista">
            {cuentas.map(cuenta => (
              <button
                key={cuenta}
                onClick={() => onAccountChange(cuenta)}
                className={`btn-pildora ${selectedAccount === cuenta ? 'activa' : ''}`}
              >
                {cuenta}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
