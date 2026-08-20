package com.financeai.service.impl;

import com.financeai.entity.Category;
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
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Optional<Category> getCategoryByName(String name) {
        return categoryRepository.findByName(name);
    }

    @Override
    public Category createCategory(String name, String color, Integer percentage, String icon) {
        Category category = new Category();
        category.setName(name);
        category.setColor(color);
        category.setPercentage(percentage);
        category.setIcon(icon);
        return categoryRepository.save(category);
    }
}