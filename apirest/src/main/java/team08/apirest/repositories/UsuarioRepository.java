package team08.apirest.repositories;

import java.util.ArrayList;

import org.springframework.data.repository.CrudRepository;
import team08.apirest.models.UsuarioModel;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends CrudRepository<UsuarioModel, Long>{

    // Buscar por perfil financiero (coincidencia exacta del String)
    ArrayList<UsuarioModel> findByPerfilFinanciero(String perfilFinanciero);

    // Buscar usuarios con meses de supervivencia mayores a 0
    ArrayList<UsuarioModel> findByMesesSupervivenciaMayoresA(int mesesSupervivencia);
}
