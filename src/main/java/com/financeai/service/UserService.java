package com.financeai.service;

import com.financeai.entity.User;
import java.util.Optional;

public interface UserService {
    User createUser(String email, String password, String firstName, String lastName);
    Optional<User> getUserById(Long id);
    Optional<User> getUserByEmail(String email);
    User updateUser(Long id, User user);
    void deleteUser(Long id);
    User updateFinancialData(Long userId, Double income, Double expenses, Double emergencyFund, Double debt);
}