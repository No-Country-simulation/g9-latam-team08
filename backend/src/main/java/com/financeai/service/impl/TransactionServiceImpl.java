package com.financeai.service.impl;

import com.financeai.dto.CreateTransactionDTO;
import com.financeai.dto.TransactionDTO;
import com.financeai.entity.Categoria;
import com.financeai.entity.Transaccion;
import com.financeai.entity.Usuario;
import com.financeai.repository.CategoryRepository;
import com.financeai.repository.TransactionRepository;
import com.financeai.repository.UserRepository;
import com.financeai.service.MlService;
import com.financeai.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
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

    @Autowired
    private MlService mlService;

    @Override
    public TransactionDTO createTransaction(Long userId, CreateTransactionDTO dto) {
        Optional<Usuario> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        // Si la categoría es genérica ("Otras", "Otros", null), intentar predecir con el modelo ML
        String categoriaNombre = dto.getCategoriaPrincipal();
        if (categoriaNombre == null || categoriaNombre.isBlank()
                || categoriaNombre.equalsIgnoreCase("Otras")
                || categoriaNombre.equalsIgnoreCase("Otros")) {

            try {
                String descripcion = dto.getNombreTienda() != null ? dto.getNombreTienda() : "";
                String predicha = mlService.predecirCategoria(Map.of(
                        "nombre_tienda", descripcion,
                        "subcategoria", descripcion,
                        "esencial", false
                ));
                if (predicha != null && !predicha.isBlank()) {
                    categoriaNombre = predicha;
                }
            } catch (Exception e) {
                System.err.println("[TransactionService] ML prediction failed, using fallback: " + e.getMessage());
            }

            // Si sigue sin categoría válida, usar "Otros" como fallback
            if (categoriaNombre == null || categoriaNombre.isBlank()) {
                categoriaNombre = "Otros";
            }
        }

        Optional<Categoria> category = categoryRepository.findByName(categoriaNombre);

        // Si la categoría no existe, crearla
        if (category.isEmpty()) {
            Categoria nuevaCategoria = new Categoria();
            nuevaCategoria.setName(categoriaNombre);
            nuevaCategoria.setColor("#78909C");
            nuevaCategoria.setPercentage(0);
            nuevaCategoria.setIcon("tag");
            nuevaCategoria = categoryRepository.save(nuevaCategoria);
            category = Optional.of(nuevaCategoria);
        }

        Transaccion transaction = new Transaccion();
        transaction.setUser(user.get());
        transaction.setDescription(dto.getNombreTienda());
        transaction.setAmount(dto.getMonto());
        transaction.setCategory(category.get());
        transaction.setTransactionDate(dto.getFecha());
        transaction.setType(Transaccion.TransactionType.valueOf(dto.getType()));
        transaction.setConfidence(95);
        transaction.setCreatedAt(LocalDateTime.now());

        Transaccion saved = transactionRepository.save(transaction);
        return convertToDTO(saved);
    }

    @Override
    public List<TransactionDTO> getUserTransactions(Long userId) {
        Optional<Usuario> user = userRepository.findById(userId);
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
        Optional<Usuario> user = userRepository.findById(userId);
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
        Optional<Transaccion> transaction = transactionRepository.findById(transactionId);
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
    public TransactionDTO updateTransaction(Long transactionId, CreateTransactionDTO dto) {
        Optional<Transaccion> existing = transactionRepository.findById(transactionId);
        if (existing.isEmpty()) {
            throw new RuntimeException("Transaction not found");
        }

        Transaccion transaction = existing.get();

        if (dto.getNombreTienda() != null) {
            transaction.setDescription(dto.getNombreTienda());
        }
        if (dto.getMonto() != null) {
            transaction.setAmount(dto.getMonto());
        }
        if (dto.getFecha() != null) {
            transaction.setTransactionDate(dto.getFecha());
        }
        if (dto.getCategoriaPrincipal() != null) {
            Optional<Categoria> category = categoryRepository.findByName(dto.getCategoriaPrincipal());
            if (category.isPresent()) {
                transaction.setCategory(category.get());
            }
        }
        if (dto.getType() != null) {
            transaction.setType(Transaccion.TransactionType.valueOf(dto.getType()));
        }

        Transaccion saved = transactionRepository.save(transaction);
        return convertToDTO(saved);
    }

    @Override
    public List<Transaccion> getMonthlyTransactions(Long userId, Integer month, Integer year) {
        Optional<Usuario> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        return transactionRepository.findByUserAndMonth(user.get(), month, year);
    }

    private TransactionDTO convertToDTO(Transaccion transaction) {
        TransactionDTO dto = new TransactionDTO();
        dto.setId(transaction.getId());
        dto.setNombreTienda(transaction.getDescription());
        dto.setMonto(transaction.getAmount());
        dto.setCategoriaPrincipal(transaction.getCategory().getName());
        dto.setConfidence(transaction.getConfidence());
        dto.setFecha(transaction.getTransactionDate());
        dto.setType(transaction.getType().toString());
        dto.setEsencial(null); // Se puede calcular basado en la categoría
        dto.setMetodoPago(null); // Campo opcional
        dto.setSubcategoria(null); // Campo opcional
        return dto;
    }
}
