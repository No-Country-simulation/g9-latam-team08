package team08.apirest.controllers;

import team08.apirest.models.GastoModel;
import team08.apirest.services.GastoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/gastos") // Ruta base para los endpoints de gastos
@CrossOrigin(origins = "*")
public class GastoController {

    @Autowired
    private GastoService gastoService;

    // GET: Obtener todos los gastos
    @GetMapping
    public List<GastoModel> listarGastos() {
        return gastoService.obtenerGastos();
    }

    // POST: Registrar un nuevo gasto
    @PostMapping
    public GastoModel guardarGasto(@RequestBody GastoModel gasto) {
        return gastoService.guardarGasto(gasto);
    }

    // GET: Obtener los gastos de un cliente en especifico
    @GetMapping("/cliente/{idCliente}")
    public List<GastoModel> obtenerGastosPorCliente(@PathVariable Long idCliente) {
        return gastoService.obtenerGastosPorCliente(idCliente);
    }

    // GET: Obtener un gasto por su ID
    @GetMapping("/{id}")
    public Optional<GastoModel> obtenerGastoPorId(@PathVariable Long id) {
        return gastoService.obtenerGastoPorId(id);
    }

    // DELETE: Eliminar un gasto por su ID
    @DeleteMapping("/{id}")
    public String eliminarGasto(@PathVariable Long id) {
        boolean ok = gastoService.eliminarGasto(id);
        if (ok) {
            return "Se eliminó el gasto con id " + id;
        } else {
            return "No pudo eliminar el gasto con id " + id;
        }
    }
}