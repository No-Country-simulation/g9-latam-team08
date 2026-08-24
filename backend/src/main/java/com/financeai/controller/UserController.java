
package com.financeai.controller;

import com.financeai.config.JwtService;
import com.financeai.entity.Usuario;
import com.financeai.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        try {
            String email = loginRequest.get("email");
            String password = loginRequest.get("password");

            if (email == null || email.isEmpty()) {
                return ResponseEntity.badRequest().body("El email es requerido");
            }
            if (password == null || password.isEmpty()) {
                return ResponseEntity.badRequest().body("La contraseña es requerida");
            }

            Optional<Usuario> user = userService.getUserByEmail(email);
            if (user.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
            }

            boolean passwordValid = userService.verifyPassword(password, user.get().getPassword());
            if (!passwordValid) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
            }

            Usuario u = user.get();
            String token = jwtService.generateToken(u.getId(), u.getEmail(), u.getNombre());

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("id", u.getId());
            response.put("nombre", u.getNombre());
            response.put("email", u.getEmail());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al iniciar sesión");
        }
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody Usuario user) {
        try {
            if (user.getEmail() == null || user.getEmail().isEmpty()) {
                return ResponseEntity.badRequest().body("El email es requerido");
            }
            if (user.getPassword() == null || user.getPassword().isEmpty()) {
                return ResponseEntity.badRequest().body("La contraseña es requerida");
            }
            if (user.getNombre() == null || user.getNombre().isEmpty()) {
                return ResponseEntity.badRequest().body("El nombre es requerido");
            }

            Usuario created = userService.createUser(
                user.getEmail(),
                user.getPassword(),
                user.getNombre()
            );

            String token = jwtService.generateToken(created.getId(), created.getEmail(), created.getNombre());

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("id", created.getId());
            response.put("nombre", created.getNombre());
            response.put("email", created.getEmail());

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al crear usuario: " + e.getMessage());
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Usuario> getUser(@PathVariable Long userId) {
        try {
            Optional<Usuario> user = userService.getUserById(userId);
            return user.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Usuario> getUserByEmail(@PathVariable String email) {
        try {
            Optional<Usuario> user = userService.getUserByEmail(email);
            return user.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{userId}")
    public ResponseEntity<Usuario> updateUser(
            @PathVariable Long userId,
            @Valid @RequestBody Usuario user) {
        try {
            Usuario updated = userService.updateUser(userId, user);
            if (updated == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{userId}/financial")
    public ResponseEntity<Usuario> updateFinancialData(
            @PathVariable Long userId,
            @RequestParam(required = false) Double ingresoMensual,
            @RequestParam(required = false) Double gastosMensuales,
            @RequestParam(required = false) Double ahorroPrevio,
            @RequestParam(required = false) Double cuotasMensualesDeuda) {
        try {
            Usuario updated = userService.updateFinancialData(userId, ingresoMensual, gastosMensuales, ahorroPrevio, cuotasMensualesDeuda);
            if (updated == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        try {
            userService.deleteUser(userId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}