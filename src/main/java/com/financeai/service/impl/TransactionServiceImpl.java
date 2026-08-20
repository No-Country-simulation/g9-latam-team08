package com.financeai.service.impl;

import com.financeai.dto.CreateTransactionDTO;
import com.financeai.dto.TransactionDTO;
import com.financeai.entity.Category;
import com.financeai.entity.Transaction;
import com.financeai.entity.User;
import com.financeai.repository.CategoryRepository;
import com.financeai.repository.TransactionRepository;
import com.financeai.repository.UserRepository;
import com.financeai.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public TransactionDTO createTransaction(Long userId, CreateTransactionDTO dto) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        Optional<Category> category = categoryRepository.findByName(dto.getCategory());
        if (category.isEmpty()) {
            throw new RuntimeException("Category not found");
        }

        Transaction transaction = new Transaction();
        transaction.setUser(user.get());
        transaction.setDescription(dto.getDescription());
        transaction.setAmount(dto.getAmount());
        transaction.setCategory(category.get());
        transaction.setTransactionDate(dto.getTransactionDate());
        transaction.setType(Transaction.TransactionType.valueOf(dto.getType()));
        transaction.setConfidence(95); // Default confidence
        transaction.setCreatedAt(LocalDateTime.now());

        Transaction saved = transactionRepository.save(transaction);
        return convertToDTO(saved);
    }

    @Override
    public List<TransactionDTO> getUserTransactions(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        return transactionRepository.findByUser(user.get())
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<TransactionDTO> getRecentTransactions(Long userId, Integer limit) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        return transactionRepository.findByUserOrderByTransactionDateDesc(user.get())
                .stream()
                .limit(limit)
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TransactionDTO getTransaction(Long transactionId) {
        Optional<Transaction> transaction = transactionRepository.findById(transactionId);
        if (transaction.isEmpty()) {
            throw new RuntimeException("Transaction not found");
        }
        return convertToDTO(transaction.get());
    }

    @Override
    public void deleteTransaction(Long transactionId) {
        transactionRepository.deleteById(transactionId);
    }

    @Override
    public List<Transaction> getMonthlyTransactions(Long userId, Integer month, Integer year) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        return transactionRepository.findByUserAndMonth(user.get(), month, year);
    }

    private TransactionDTO convertToDTO(Transaction transaction) {
        TransactionDTO dto = new TransactionDTO();
        dto.setId(transaction.getId());
        dto.setDescription(transaction.getDescription());
        dto.setAmount(transaction.getAmount());
        dto.setCategory(transaction.getCategory().getName());
        dto.setConfidence(transaction.getConfidence());
        dto.setTransactionDate(transaction.getTransactionDate());
        dto.setType(transaction.getType().toString());
        return dto;
    }
}