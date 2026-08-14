import { ResumenFinancieroProps } from '../types/transaction-type'; // Ajusta la ruta según dónde guardaste el types.ts
 import "./ResumenFinanciero.css";

export default function ResumenFinanciero({ ingresosTotales, egresosTotales }: ResumenFinancieroProps) {

  // Función auxiliar para formatear la moneda
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 2, // Viendo tu diseño, ahora usas decimales
    }).format(amount);
  };

  return (
    <div className="resumen-container">
      <div className="tarjeta-resumen tarjeta-ingresos">
        <span>Ingresos Totales: </span>
        <span className="monto-positivo">{formatCurrency(ingresosTotales)}</span>
      </div>

      <div className="tarjeta-resumen tarjeta-egresos">
        <span>Egresos Totales: </span>
        <span className="monto-negativo">{formatCurrency(egresosTotales)}</span>
      </div>
    </div>
  );
}
