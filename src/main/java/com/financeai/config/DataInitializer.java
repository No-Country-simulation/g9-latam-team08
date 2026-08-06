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
    public void run(String... args) throws Exception {
        if (categoryRepository.count() == 0) {
            createDefaultCategories();
        }
    }

    private void createDefaultCategories() {
        Categoria housing = new Categoria();
        housing.setName("Vivienda");
        housing.setColor("#1F77B4");
        housing.setPercentage(30);
        housing.setIcon("🏠");
        categoryRepository.save(housing);

        Categoria food = new Categoria();
        food.setName("Alimentación");
        food.setColor("#2CA02C");
        food.setPercentage(25);
        food.setIcon("🍔");
        categoryRepository.save(food);

        Categoria transport = new Categoria();
        transport.setName("Transporte");
        transport.setColor("#FF7F0E");
        transport.setPercentage(15);
        transport.setIcon("🚗");
        categoryRepository.save(transport);

        Categoria services = new Categoria();
        services.setName("Servicios");
        services.setColor("#D62728");
        services.setPercentage(10);
        services.setIcon("⚙️");
        categoryRepository.save(services);

        Categoria health = new Categoria();
        health.setName("Salud");
        health.setColor("#9467BD");
        health.setPercentage(8);
        health.setIcon("⚕️");
        categoryRepository.save(health);

        Categoria entertainment = new Categoria();
        entertainment.setName("Entretenimiento");
        entertainment.setColor("#8C564B");
        entertainment.setPercentage(10);
        entertainment.setIcon("🎬");
        categoryRepository.save(entertainment);

        Categoria other = new Categoria();
        other.setName("Otros");
        other.setColor("#E377C2");
        other.setPercentage(2);
        other.setIcon("📦");
        categoryRepository.save(other);
    }
}
