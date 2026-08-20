package com.financeai.config;

import com.financeai.entity.Category;
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
        
        Category housing = new Category();
        housing.setName("Vivienda");
        housing.setColor("#1F77B4");
        housing.setPercentage(30);
        housing.setIcon("🏠");
        categoryRepository.save(housing);

        
        Category food = new Category();
        food.setName("Alimentación");
        food.setColor("#2CA02C");
        food.setPercentage(25);
        food.setIcon("🍔");
        categoryRepository.save(food);

        
        Category transport = new Category();
        transport.setName("Transporte");
        transport.setColor("#FF7F0E");
        transport.setPercentage(15);
        transport.setIcon("🚗");
        categoryRepository.save(transport);

        
        Category services = new Category();
        services.setName("Servicios");
        services.setColor("#D62728");
        services.setPercentage(10);
        services.setIcon("⚙️");
        categoryRepository.save(services);

        
        Category health = new Category();
        health.setName("Salud");
        health.setColor("#9467BD");
        health.setPercentage(8);
        health.setIcon("⚕️");
        categoryRepository.save(health);

        
        Category entertainment = new Category();
        entertainment.setName("Entretenimiento");
        entertainment.setColor("#8C564B");
        entertainment.setPercentage(10);
        entertainment.setIcon("🎬");
        categoryRepository.save(entertainment);

        
        Category other = new Category();
        other.setName("Otros");
        other.setColor("#E377C2");
        other.setPercentage(2);
        other.setIcon("📦");
        categoryRepository.save(other);
    }
}