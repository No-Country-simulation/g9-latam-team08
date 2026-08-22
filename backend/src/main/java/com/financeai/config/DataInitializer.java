package com.financeai.config;

import com.financeai.entity.Categoria;
import com.financeai.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public void run(String... args) {
        // Solo crear si la tabla está vacía
        if (categoryRepository.count() == 0) {
            crearCategoria("Alimentación", "#2CA02C", "utensils");
            crearCategoria("Transporte", "#FF7F0E", "car");
            crearCategoria("Salud", "#9467BD", "heart-pulse");
            crearCategoria("Hogar", "#1F77B4", "home");
            crearCategoria("Entretenimiento", "#8C564B", "gamepad");
            crearCategoria("Finanzas", "#4CAF50", "dollar-sign");
            System.out.println("[DataInitializer] Categorías creadas exitosamente.");
        }
    }

    private void crearCategoria(String nombre, String color, String icon) {
        Categoria cat = new Categoria();
        cat.setName(nombre);
        cat.setColor(color);
        cat.setIcon(icon);
        categoryRepository.save(cat);
    }
}
