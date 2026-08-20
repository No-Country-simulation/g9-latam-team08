import { Transaction } from "../types/transaction-type";

export const exportarTransaccionesPDF = async (transacciones: Transaction[]) => {
  const [{ default: jsPDF }, { default: autoTable }] = await Promise.all([
    import("jspdf"),
    import("jspdf-autotable"),
  ]);

  // 1. Inicializamos el documento PDF
  const doc = new jsPDF();

  // 2. Título del PDF
  doc.setFontSize(18);
  doc.text("Historial de Transacciones", 14, 22);

  // Subtítulo con la fecha de exportación
  doc.setFontSize(11);
  doc.setTextColor(100);
  const fechaActual = new Date().toLocaleDateString('es-AR');
  doc.text(`Generado el: ${fechaActual}`, 14, 30);

  // 3. Preparamos los datos para la tabla
  const tableData = transacciones.map((t) => [
    t.description,
    t.category,
    t.type === 'income' ? 'Ingreso' : 'Egreso',
    new Date(t.date).toLocaleDateString('es-AR'),
    `$${t.amount.toLocaleString('es-AR')}`
  ]);

  // 4. Dibujamos la tabla
  autoTable(doc, {
    startY: 36,
    head: [['Descripción', 'Categoría', 'Tipo', 'Fecha', 'Monto']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [13, 148, 136],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    styles: {
      fontSize: 10,
      cellPadding: 4,
    },
    columnStyles: {
      4: { halign: 'right' },
    },
  });

  // 5. Descargamos el archivo
  doc.save("reporte_financiero.pdf");
};
