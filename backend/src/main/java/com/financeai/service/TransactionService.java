package com.financeai.service;

import com.financeai.dto.CreateTransactionDTO;
import com.financeai.dto.TransactionDTO;
import com.financeai.entity.Transaccion;
import java.util.List;

public interface TransactionService {
    TransactionDTO createTransaction(Long userId, CreateTransactionDTO dto);
    List<TransactionDTO> getUserTransactions(Long userId);
    List<TransactionDTO> getRecentTransactions(Long userId, Integer limit);
    TransactionDTO getTransaction(Long transactionId);
    TransactionDTO updateTransaction(Long transactionId, CreateTransactionDTO dto);
    void deleteTransaction(Long transactionId);
    List<Transaccion> getMonthlyTransactions(Long userId, Integer month, Integer year);
}
