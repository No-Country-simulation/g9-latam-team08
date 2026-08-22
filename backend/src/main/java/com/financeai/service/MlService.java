package com.financeai.service;

import java.util.Map;

public interface MlService {

    /**
     * Envía los datos financieros al microservicio de ML (Python)
     * y devuelve los indicadores calculados + la predicción del perfil financiero.
     *
     * @param datosFinancieros mapa con las variables base del usuario
     * @return mapa con todos los indicadores calculados y perfil_financiero predicho
     */
    Map<String, Object> calcularFinanzas(Map<String, Object> datosFinancieros);

    /**
     * Predice la categoría de un gasto usando el modelo de clasificación.
     *
     * @param datoGasto mapa con los datos del gasto (nombre_tienda, monto, etc.)
     * @return la categoría predicha como string
     */
    String predecirCategoria(Map<String, Object> datoGasto);

    /**
     * Verifica si el microservicio de ML está disponible.
     *
     * @return true si el servicio responde correctamente
     */
    boolean isServiceAvailable();
}
