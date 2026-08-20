package com.financeai.repository;

import com.financeai.entity.Alert;
import com.financeai.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AlertRepository extends JpaRepository<Alert, Long> {
    List<Alert> findByUser(User user);
    List<Alert> findByUserOrderByCreatedAtDesc(User user);
    List<Alert> findByUserAndIsReadFalse(User user);
}