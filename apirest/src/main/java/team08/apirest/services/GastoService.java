package team08.apirest.services;

import team08.apirest.models.GastoModel;
import team08.apirest.repositories.GastoRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GastoService {
    @Autowired
    private GastoRepository gastoRepository;

    private final String PYTHON_ML_URL = ""; // URL de tu API de Python

    // Obtener todos los gastos
    public List<GastoModel> obtenerGastos() {
        return gastoRepository.findAll();
    }

    // Guardar o actualizar un gasto
    public GastoModel guardarGasto(GastoModel gasto) {
        return gastoRepository.save(gasto);
    }

    // Buscar gastos por el ID del cliente
    public List<GastoModel> obtenerGastosPorCliente(Long idCliente) {
        return gastoRepository.findByUsuarioIdCliente(idCliente);
    }

    // Buscar un gasto por su ID
    public Optional<GastoModel> obtenerGastoPorId(Long id) {
        return gastoRepository.findById(id);
    }

    // Eliminar un gasto
    public boolean eliminarGasto(Long id) {
        try {
            gastoRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public GastoModel guardarYClasificarGasto(GastoModel gasto) {
        try {
            // Modelo Gasto
            RestTemplate restTemplate = new RestTemplate();
            
            // Respuesta de APi Python
            PredictionResponse respuesta = restTemplate.postForObject(PYTHON_ML_URL, gasto, PredictionResponse.class);

            if (respuesta != null && respuesta.getCategoriaPredicha() != null) {
                // Se asigna la categoria predicha
                gasto.setCategoriaPrincipal(respuesta.getCategoriaPredicha());
            }
        } catch (Exception e) {
            // ERROR por si el modelo no esta activo
            System.err.println("No se pudo conectar con el modelo de ML: " + e.getMessage());
        }

        // Guardar finalmente en la base de datos MySQL
        return gastoRepository.save(gasto);
    }

    
}

// Clase auxiliar para mapear la respuesta de Python
class PredictionResponse {
    private String categoriaPredicha;

    public String getCategoriaPredicha() { return categoriaPredicha; }
    public void setCategoriaPredicha(String categoriaPredicha) { this.categoriaPredicha = categoriaPredicha; }
}