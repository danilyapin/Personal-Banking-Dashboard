package com.dl17.backend.Controller;

import com.dl17.backend.DTO.CategoryDTO;
import com.dl17.backend.Model.Category;
import com.dl17.backend.Service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategoriesForUser() {
        String username = getLoggedInUsername();
        List<Category> categories = categoryService.getAllCategoriesForUser(username);
        return ResponseEntity.ok(categories);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategoryForUser(@PathVariable String id, @RequestBody CategoryDTO categoryDTO) {
        String username = getLoggedInUsername();
        return categoryService.updateCategoryForUser(username, id, categoryDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Category> createCategoryForUserName(@RequestBody CategoryDTO categoryDTO) {
        String username = getLoggedInUsername();
        Category created = categoryService.createCategoryForUserName(username, categoryDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategoryById(@PathVariable String id) {
        String username = getLoggedInUsername();
        boolean deleted = categoryService.deleteCategoryById(username, id);
        if (deleted) {
            return ResponseEntity.ok("Category has been deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Category with id " + id + "not found.");
        }
    }

    private String getLoggedInUsername(){
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

}
