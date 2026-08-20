package com.financeai.service.impl;

import com.financeai.entity.User;
import com.financeai.repository.UserRepository;
import com.financeai.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User createUser(String email, String password, String firstName, String lastName) {
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setMonthlyIncome(0.0);
        user.setMonthlyExpenses(0.0);
        user.setEmergencyFund(0.0);
        user.setMonthlyDebt(0.0);
        user.setCreatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User updateUser(Long id, User user) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            User u = existingUser.get();
            u.setFirstName(user.getFirstName());
            u.setLastName(user.getLastName());
            u.setUpdatedAt(LocalDateTime.now());
            return userRepository.save(u);
        }
        return null;
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User updateFinancialData(Long userId, Double income, Double expenses, Double emergencyFund, Double debt) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            User u = user.get();
            if (income != null) u.setMonthlyIncome(income);
            if (expenses != null) u.setMonthlyExpenses(expenses);
            if (emergencyFund != null) u.setEmergencyFund(emergencyFund);
            if (debt != null) u.setMonthlyDebt(debt);
            u.setUpdatedAt(LocalDateTime.now());
            return userRepository.save(u);
        }
        return null;
    }
}