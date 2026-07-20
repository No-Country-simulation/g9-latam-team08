package team08.apirest.repositories;

import org.springframework.data.repository.CrudRepository;
import team08.apirest.models.UsuarioModel;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends CrudRepository<UsuarioModel, Long>{


}
