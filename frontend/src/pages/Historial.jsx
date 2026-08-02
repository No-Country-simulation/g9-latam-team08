import { useState } from "react";
import "./Historial.css";

export default function Historial() {
    // Simulamos los datos
    const [transacciones] = useState([
        { id: 1, descripcion: 'Supermercado La Anónima', monto: -45230, categoria: 'Alimentación', fecha: '20 May', icono: '🛒' },
        { id: 2, descripcion: 'Carga SUBE', monto: -1200, categoria: 'Transporte', fecha: '19 May', icono: '🚌' },
        { id: 3, descripcion: 'Netflix', monto: -6499, categoria: 'Entretenimiento', fecha: '18 May', icono: '📺' },
        { id: 4, descripcion: 'Farmacity', monto: -8750, categoria: 'Salud', fecha: '15 May', icono: '💊' },
        { id: 5, descripcion: 'Transferencia recibida (Sueldo)', monto: 900000, categoria: 'Ingresos', fecha: '01 May', icono: '💼' },
    ]);

    const [filtroTexto, setFiltroTexto] = useState('');

    // Función para dar formato de moneda
    const formatearMoneda = (valor) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0
        }).format(valor);
    };

    return (
        <div className="historial-container">
            <header className="cabecera-historial">
                <div>
                    <h1>Historial de Transacciones</h1>
                    <p>Revisa y gestiona todos tus movimientos financieros.</p>
                </div>

                <button className="boton-agregar" onClick={() => alert("Función de agregar transacción aún no implementada.")}>
                    <span>+</span> Agregar transacción
                </button>
            </header>

            <section className="tarjeta historial-toolbar">
                <input
                    className="historial-input"
                    type="text"
                    placeholder="Buscar por descripción..."
                    value={filtroTexto}
                    onChange={(e) => setFiltroTexto(e.target.value)}
                />
            </section>

            <div className="tarjeta historial-tabla">
                <div className="historial-tabla-header">
                    <span>Descripción</span>
                    <span>Categoría</span>
                    <span className="historial-columna-monto">Monto</span>
                    <span className="historial-columna-fecha">Fecha</span>
                </div>

                <section className="historial-tabla-body">
                    {transacciones.map((tx) => (
                        <div key={tx.id} className="historial-tabla-row">
                            <div className="historial-descripcion">
                                <div className="historial-icono">{tx.icono}</div>
                                <span className="historial-texto">{tx.descripcion}</span>
                            </div>

                            <div>
                                <BadgeCategoria categoria={tx.categoria} />
                            </div>

                            <div className={`historial-monto ${tx.monto < 0 ? "" : "historial-monto-positivo"}`}>
                                {formatearMoneda(tx.monto)}
                            </div>

                            <div className="historial-fecha">{tx.fecha}</div>
                        </div>
                    ))}
                </section>

                <div className="historial-paginacion">
                    <button className="historial-paginacion-boton">
                        Ver todas las transacciones &gt;
                    </button>
                </div>
            </div>
        </div>
    );
}

// ==========================================
// COMPONENTE SECUNDARIO
// ==========================================
function BadgeCategoria({ categoria }) {
    const clasesPorCategoria = {
        Alimentación: "badge-categoria-alimentacion",
        Transporte: "badge-categoria-transporte",
        Entretenimiento: "badge-categoria-entretenimiento",
        Salud: "badge-categoria-salud",
        Ingresos: "badge-categoria-ingresos"
    };

    const claseActual = clasesPorCategoria[categoria] || "badge-categoria-default";

    return <span className={`badge-categoria ${claseActual}`}>{categoria}</span>;

}
