package com.financeai.service.impl;

import com.financeai.entity.Usuario;
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
    public Usuario createUser(String email, String password, String nombre) {
        Usuario user = new Usuario();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setNombre(nombre);
        user.setIngresoMensual(0.0);
        user.setGastosMensuales(0.0);
        user.setAhorroPrevio(0.0);
        user.setCuotasMensualesDeuda(0.0);
        return userRepository.save(user);
    }

    @Override
    public Optional<Usuario> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<Usuario> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Usuario updateUser(Long id, Usuario user) {
        Optional<Usuario> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            Usuario u = existingUser.get();
            u.setNombre(user.getNombre());
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
    public Usuario updateFinancialData(Long userId, Double ingresoMensual, Double gastosMensuales, Double ahorroPrevio, Double cuotasMensualesDeuda) {
        Optional<Usuario> user = userRepository.findById(userId);
        if (user.isPresent()) {
            Usuario u = user.get();
            if (ingresoMensual != null) u.setIngresoMensual(ingresoMensual);
            if (gastosMensuales != null) u.setGastosMensuales(gastosMensuales);
            if (ahorroPrevio != null) u.setAhorroPrevio(ahorroPrevio);
            if (cuotasMensualesDeuda != null) u.setCuotasMensualesDeuda(cuotasMensualesDeuda);
            u.setUpdatedAt(LocalDateTime.now());
            return userRepository.save(u);
        }
        return null;
    }

    @Override
    public boolean verifyPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}

