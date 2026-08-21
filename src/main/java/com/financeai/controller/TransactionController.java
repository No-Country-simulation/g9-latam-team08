package com.financeai.controller;

import com.financeai.dto.CreateTransactionDTO;
import com.financeai.dto.TransactionDTO;
import com.financeai.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping
    public ResponseEntity<?> createTransaction(
            @RequestParam Long userId,
            @RequestBody CreateTransactionDTO dto) {
        try {
            if (dto.getNombreTienda() == null || dto.getNombreTienda().isEmpty()) {
                return ResponseEntity.badRequest().body("El nombre de tienda es requerido");
            }
            if (dto.getMonto() == null) {
                return ResponseEntity.badRequest().body("El monto es requerido");
            }
            if (dto.getCategoriaPrincipal() == null || dto.getCategoriaPrincipal().isEmpty()) {
                return ResponseEntity.badRequest().body("La categoría principal es requerida");
            }
            if (dto.getFecha() == null) {
                return ResponseEntity.badRequest().body("La fecha es requerida");
            }
            if (dto.getType() == null || dto.getType().isEmpty()) {
                return ResponseEntity.badRequest().body("El tipo es requerido (INCOME o EXPENSE)");
            }
            
            TransactionDTO transaction = transactionService.createTransaction(userId, dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(transaction);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TransactionDTO>> getUserTransactions(@PathVariable Long userId) {
        try {
            List<TransactionDTO> transactions = transactionService.getUserTransactions(userId);
            return ResponseEntity.ok(transactions);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/user/{userId}/recent")
    public ResponseEntity<List<TransactionDTO>> getRecentTransactions(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "5") Integer limit) {
        try {
            List<TransactionDTO> transactions = transactionService.getRecentTransactions(userId, limit);
            return ResponseEntity.ok(transactions);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{transactionId}")
    public ResponseEntity<TransactionDTO> getTransaction(@PathVariable Long transactionId) {
        try {
            TransactionDTO transaction = transactionService.getTransaction(transactionId);
            return ResponseEntity.ok(transaction);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{transactionId}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long transactionId) {
        try {
            transactionService.deleteTransaction(transactionId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{transactionId}")
    public ResponseEntity<?> updateTransaction(
            @PathVariable Long transactionId,
            @RequestBody CreateTransactionDTO dto) {
        try {
            TransactionDTO existing = transactionService.getTransaction(transactionId);
            if (existing == null) {
                return ResponseEntity.notFound().build();
            }
            // Reutilizar el userId de la transacción existente
            TransactionDTO updated = transactionService.updateTransaction(transactionId, dto);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
