package com.financeai.service;

import com.financeai.entity.Usuario;
import java.util.Optional;

public interface UserService {
    Usuario createUser(String email, String password, String nombre);
    Optional<Usuario> getUserById(Long id);
    Optional<Usuario> getUserByEmail(String email);
    Usuario updateUser(Long id, Usuario user);
    void deleteUser(Long id);
    Usuario updateFinancialData(Long userId, Double ingresoMensual, Double gastosMensuales, Double ahorroPrevio, Double cuotasMensualesDeuda);
    boolean verifyPassword(String rawPassword, String encodedPassword);
}
