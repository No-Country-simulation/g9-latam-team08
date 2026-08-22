import { Pencil, Trash2 } from "lucide-react";
import { FilaTransaccionProps } from "../../types/transaction-type";


export default function FilaTransaccion({ transaccion, onEdit, onDelete }: FilaTransaccionProps) {


  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-AR', options);
  };

 return (
    <tr className="tabla-fila">
      {/* Cuidado aquí: el data-label DEBE estar escrito exactamente así */}
      <td className="tabla-celda font-medium" data-label="DESCRIPCIÓN">
        {transaccion.description}
      </td>
      <td className="tabla-celda font-bold" data-label="MONTO">
        {formatCurrency(transaccion.amount)}
      </td>
      <td className="tabla-celda text-muted" data-label="FECHA">
        {formatDate(transaccion.date)}
      </td>
      <td className="tabla-celda" data-label="CATEGORÍA">
        <span className="pildora-categoria">{transaccion.category}</span>
      </td>
      <td className="tabla-celda tabla-acciones" data-label="ACCIÓN">
        <button
          onClick={() => onEdit(transaccion)}
          className="btn-accion btn-editar"
          title="Editar transacción"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={() => onDelete(transaccion.id)}
          className="btn-accion btn-eliminar"
          title="Eliminar transacción"
        >
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  )
}
