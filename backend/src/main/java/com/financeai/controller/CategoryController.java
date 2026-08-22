package com.financeai.controller;

import com.financeai.entity.Categoria;
import com.financeai.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<Categoria>> getAllCategories() {
        try {
            List<Categoria> categories = categoryService.getAllCategories();
            return ResponseEntity.ok(categories);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{nombre}")
    public ResponseEntity<Categoria> getCategoryByName(@PathVariable String nombre) {
        try {
            Optional<Categoria> category = categoryService.getCategoryByName(nombre);
            return category.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
    public ResponseEntity<Categoria> createCategory(@RequestBody Categoria category) {
        try {
            Categoria created = categoryService.createCategory(
                category.getNombre(),
                category.getColor(),
                category.getIcon()
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
