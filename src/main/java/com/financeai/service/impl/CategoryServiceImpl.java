package com.financeai.service.impl;

import com.financeai.entity.Categoria;
import com.financeai.repository.CategoryRepository;
import com.financeai.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Categoria> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Optional<Categoria> getCategoryByName(String name) {
        return categoryRepository.findByName(name);
    }

    @Override
    public Categoria createCategory(String name, String color, Integer percentage, String icon) {
        Categoria category = new Categoria();
        category.setName(name);
        category.setColor(color);
        category.setPercentage(percentage);
        category.setIcon(icon);
        return categoryRepository.save(category);
    }
}
