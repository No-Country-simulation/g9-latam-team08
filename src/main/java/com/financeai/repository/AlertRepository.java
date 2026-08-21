package com.financeai.repository;

import com.financeai.entity.Alerta;
import com.financeai.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AlertRepository extends JpaRepository<Alerta, Long> {
    List<Alerta> findByUser(Usuario usuario);
    List<Alerta> findByUserOrderByCreatedAtDesc(Usuario usuario);
    List<Alerta> findByUserAndIsReadFalse(Usuario usuario);
}
