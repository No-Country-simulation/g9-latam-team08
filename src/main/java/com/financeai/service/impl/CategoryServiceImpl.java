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
    public Optional<Categoria> getCategoryByName(String nombre) {
        return categoryRepository.findByNombre(nombre);
    }

    @Override
    public Categoria createCategory(String nombre, String color, String icon) {
        Categoria categoria = new Categoria();
        categoria.setNombre(nombre);
        categoria.setColor(color);
        categoria.setIcon(icon);
        return categoryRepository.save(categoria);
    }
}
