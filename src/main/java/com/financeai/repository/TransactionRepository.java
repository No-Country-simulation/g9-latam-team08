package com.financeai.repository;

import com.financeai.entity.Transaction;
import com.financeai.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUser(User user);

    List<Transaction> findByUserAndTransactionDateBetween(
            User user,
            LocalDateTime startDate,
            LocalDateTime endDate
    );

    List<Transaction> findByUserOrderByTransactionDateDesc(User user);

    @Query("SELECT t FROM Transaction t WHERE t.user = :user AND MONTH(t.transactionDate) = :month AND YEAR(t.transactionDate) = :year")
    List<Transaction> findByUserAndMonth(
            @Param("user") User user,
            @Param("month") Integer month,
            @Param("year") Integer year
    );
}