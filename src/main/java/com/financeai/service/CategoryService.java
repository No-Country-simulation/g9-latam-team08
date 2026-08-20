package com.financeai.service;

import com.financeai.entity.Category;
import java.util.List;
import java.util.Optional;

public interface CategoryService {
    List<Category> getAllCategories();
    Optional<Category> getCategoryByName(String name);
    Category createCategory(String name, String color, Integer percentage, String icon);
}