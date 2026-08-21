package com.financeai.repository;

import com.financeai.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Categoria, Long> {
    Optional<Categoria> findByNombre(String nombre);

    List<Categoria> findByCategoriaPadreIsNull();

    // Alias de compatibilidad
    default Optional<Categoria> findByName(String name) {
        return findByNombre(name);
    }
}
