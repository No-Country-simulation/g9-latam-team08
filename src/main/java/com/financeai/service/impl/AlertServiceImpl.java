package com.financeai.service.impl;

import com.financeai.dto.AlertDTO;
import com.financeai.entity.Alert;
import com.financeai.entity.User;
import com.financeai.repository.AlertRepository;
import com.financeai.repository.UserRepository;
import com.financeai.service.AlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class AlertServiceImpl implements AlertService {

    @Autowired
    private AlertRepository alertRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<AlertDTO> getUserAlerts(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        return alertRepository.findByUserOrderByCreatedAtDesc(user.get())
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AlertDTO> getUnreadAlerts(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        return alertRepository.findByUserAndIsReadFalse(user.get())
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public AlertDTO markAsRead(Long alertId) {
        Optional<Alert> alert = alertRepository.findById(alertId);
        if (alert.isEmpty()) {
            throw new RuntimeException("Alert not found");
        }
        Alert a = alert.get();
        a.setIsRead(true);
        return convertToDTO(alertRepository.save(a));
    }

    @Override
    public void createAlert(Long userId, String title, String message, Alert.AlertType type) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        Alert alert = new Alert();
        alert.setUser(user.get());
        alert.setTitle(title);
        alert.setMessage(message);
        alert.setType(type);
        alert.setIsRead(false);
        alert.setCreatedAt(LocalDateTime.now());
        alertRepository.save(alert);
    }

    private AlertDTO convertToDTO(Alert alert) {
        AlertDTO dto = new AlertDTO();
        dto.setId(alert.getId());
        dto.setTitle(alert.getTitle());
        dto.setMessage(alert.getMessage());
        dto.setType(alert.getType().toString());
        dto.setIsRead(alert.getIsRead());
        return dto;
    }
}