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
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200"})
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

    @GetMapping("/{name}")
    public ResponseEntity<Categoria> getCategoryByName(@PathVariable String name) {
        try {
            Optional<Categoria> category = categoryService.getCategoryByName(name);
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
                category.getName(),
                category.getColor(),
                category.getPercentage(),
                category.getIcon()
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
