import { Pencil, Trash2 } from "lucide-react";
import { Transaction } from "../types/transaction-type";


export default function FilaTransaccion({ transaccion, onEdit, onDelete }: FilaTransaccionProps) {

  // Utilidades de formato encapsuladas en la fila
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
      <td className="tabla-celda font-medium">{transaccion.description}</td>
      <td className="tabla-celda font-bold">
        {formatCurrency(transaccion.amount)}
      </td>
      <td className="tabla-celda text-muted">{formatDate(transaccion.date)}</td>
      <td className="tabla-celda">
        {/* Aquí podrías agregar clases dinámicas según la categoría para cambiar el color de la píldora */}
        <span className="pildora-categoria">{transaccion.category}</span>
      </td>
      <td className="tabla-celda tabla-acciones">
        <button
          onClick={() => onEdit(transaccion.id)}
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
  );
}
