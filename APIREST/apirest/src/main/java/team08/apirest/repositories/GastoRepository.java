package team08.apirest.repositories;

import team08.apirest.models.GastoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GastoRepository extends JpaRepository<GastoModel, Long> {
    // Buscar gastos por ID cliente
    List<GastoModel> findByUsuarioIdCliente(Long idCliente);
}