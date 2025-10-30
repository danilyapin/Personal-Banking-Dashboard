package com.dl17.backend.Service;

import com.dl17.backend.DTO.CategoryDTO;
import com.dl17.backend.Model.Category;
import com.dl17.backend.Repository.CategoryRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
class CategoryServiceTest {

    private final CategoryRepository categoryRepository = Mockito.mock(CategoryRepository.class);
    private final CategoryService categoryService = new CategoryService(categoryRepository);

    @Test
    void getAllCategoriesForUser() {
        String userName = "user123";

        Category mockCategory1 = Category.builder()
                .categoryId("category123")
                .userId(userName)
                .name("Freizeit")
                .build();

        Category mockCategory2 = Category.builder()
                .categoryId("category321")
                .userId(userName)
                .name("Supermarket")
                .build();

        Category mockCategory3 = Category.builder()
                .categoryId("category546")
                .userId(userName)
                .name("Other")
                .build();

        when(categoryRepository.findByUserId(userName)).thenReturn(List.of(mockCategory1, mockCategory2, mockCategory3));

        List<Category> result = categoryService.getAllCategoriesForUser(userName);

        assertEquals(3, result.size());
        assertEquals(mockCategory1, result.get(0));
        assertEquals(mockCategory2, result.get(1));
        assertEquals(mockCategory3, result.get(2));

        verify(categoryRepository, times(1)).findByUserId(userName);
    }

    @Test
    void updateCategoryForUser() {
        String userName = "user123";

        Category mockCategory1 = Category.builder()
                .categoryId("category123")
                .userId(userName)
                .name("Freizeit")
                .build();

        CategoryDTO mockCategoryDTO = CategoryDTO.builder()
                .name("Supermarket")
                .build();

        when(categoryRepository.findById("category123")).thenReturn(Optional.of(mockCategory1));
        when(categoryRepository.save(any(Category.class))).thenReturn(mockCategory1);

        Optional<Category> result = categoryService.updateCategoryForUser(userName, mockCategory1.getCategoryId(), mockCategoryDTO);

        assertThat(result.get().getName()).isEqualTo(mockCategoryDTO.getName());

        verify(categoryRepository, times(1)).findById(mockCategory1.getCategoryId());
    }

    @Test
    void createCategoryForUserName() {
        String userName = "user123";

        CategoryDTO categoryDTO = CategoryDTO.builder()
                .name("Test Category")
                .build();

        Category savedCategory = Category.builder()
                .userId(userName)
                .name(categoryDTO.getName())
                .build();

        when(categoryRepository.save(any(Category.class))).thenReturn(savedCategory);

        Category result = categoryService.createCategoryForUserName(userName, categoryDTO);

        assertEquals(userName, result.getUserId());
        assertEquals(categoryDTO.getName(), result.getName());

        verify(categoryRepository, times(1)).save(any(Category.class));

    }

    @Test
    void deleteCategoryById() {
        String userName = "user123";

        Category mockCategory = Category.builder()
                .categoryId("category123")
                .userId(userName)
                .name("Freizeit")
                .build();

        when(categoryRepository.findById(mockCategory.getCategoryId())).thenReturn(Optional.of(mockCategory));

        boolean result = categoryService.deleteCategoryById(userName, mockCategory.getCategoryId());
        assertTrue(result);
        verify(categoryRepository).deleteById(mockCategory.getCategoryId());
    }
}