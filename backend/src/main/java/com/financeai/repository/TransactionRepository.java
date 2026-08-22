package com.financeai.repository;

import com.financeai.entity.Transaccion;
import com.financeai.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaccion, Long> {
    List<Transaccion> findByUser(Usuario usuario);

    List<Transaccion> findByUserAndFechaBetween(
            Usuario usuario,
            LocalDateTime startDate,
            LocalDateTime endDate
    );

    List<Transaccion> findByUserOrderByFechaDesc(Usuario usuario);

    @Query("SELECT t FROM Transaccion t WHERE t.user = :usuario AND MONTH(t.fecha) = :month AND YEAR(t.fecha) = :year")
    List<Transaccion> findByUserAndMonth(
            @Param("usuario") Usuario usuario,
            @Param("month") Integer month,
            @Param("year") Integer year
    );

    // Alias de compatibilidad
    default List<Transaccion> findByUserOrderByTransactionDateDesc(Usuario usuario) {
        return findByUserOrderByFechaDesc(usuario);
    }
}
