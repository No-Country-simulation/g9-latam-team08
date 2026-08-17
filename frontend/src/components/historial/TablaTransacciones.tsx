import { TablaTransaccionesProps } from "../../types/transaction-type";
import FilaTransaccion from "./FilaTransaccion";
import "./TablaTransacciones.css";

export default function TablaTransacciones({ transacciones, onEdit, onDelete }: TablaTransaccionesProps) {
  return (
    <div className="tabla-contenedor">
      <table className="tabla-historial">
        <thead>
          <tr className="tabla-encabezado">
            <th>DESCRIPCIÓN</th>
            <th>MONTO</th>
            <th>FECHA</th>
            <th>CATEGORÍA</th>
            <th>ACCIÓN</th>
          </tr>
        </thead>
        <tbody>
          {transacciones.length > 0 ? (
            transacciones.map((transaccion) => (
              <FilaTransaccion
                key={transaccion.id}
                transaccion={transaccion}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          ) : (
            <tr>
              <td colSpan={5} className="tabla-estado-vacio">
                No se encontraron transacciones con los filtros actuales.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
