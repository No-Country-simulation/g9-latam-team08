import { Download} from "lucide-react";
import { PieDeTablaProps } from "../types/transaction-type";
import "./PieDeTabla.css";

export default function PieDeTabla({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onNextPage,
  onPrevPage,
  onExport
}: PieDeTablaProps) {

  // Cálculos para el texto "Mostrando 1-20 de 150"
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="pie-tabla-contenedor">
      <div className="pie-tabla-info">
        MOSTRANDO {totalItems === 0 ? 0 : startItem}-{endItem} DE {totalItems} RESULTADOS
      </div>

      <div className="pie-tabla-paginacion">
        <button
          onClick={onPrevPage}
          disabled={currentPage === 1}
          className="btn-paginacion"
          aria-label="Página anterior"
        >

          <span style={{ fontSize: '14px', fontWeight: 'bold', lineHeight: 1 }}>&#10094;</span>
        </button>
        <button
          onClick={onNextPage}
          disabled={currentPage === totalPages || totalItems === 0}
          className="btn-paginacion"
          aria-label="Página siguiente"
        >

          <span style={{ fontSize: '14px', fontWeight: 'bold', lineHeight: 1 }}>&#10095;</span>
        </button>
      </div>

      <button onClick={onExport} className="btn-exportar">
        <Download size={16} />
        Exportar Datos
      </button>
    </div>
  );
}
