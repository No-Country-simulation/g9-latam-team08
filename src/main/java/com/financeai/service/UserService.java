package com.financeai.service;

import com.financeai.entity.Usuario;
import java.util.Optional;

public interface UserService {
    Usuario createUser(String email, String password, String firstName, String lastName);
    Optional<Usuario> getUserById(Long id);
    Optional<Usuario> getUserByEmail(String email);
    Usuario updateUser(Long id, Usuario user);
    void deleteUser(Long id);
    Usuario updateFinancialData(Long userId, Double income, Double expenses, Double emergencyFund, Double debt);
}
