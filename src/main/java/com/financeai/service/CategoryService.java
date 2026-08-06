package com.financeai.service;

import com.financeai.entity.Categoria;
import java.util.List;
import java.util.Optional;

public interface CategoryService {
    List<Categoria> getAllCategories();
    Optional<Categoria> getCategoryByName(String name);
    Categoria createCategory(String name, String color, Integer percentage, String icon);
}
