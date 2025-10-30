package com.dl17.backend.Controller;

import com.dl17.backend.Config.SecurityConfig;
import com.dl17.backend.DTO.CategoryDTO;
import com.dl17.backend.Model.Category;
import com.dl17.backend.Service.CategoryService;
import com.dl17.backend.Util.JwtUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CategoryController.class)
@Import(SecurityConfig.class)
@AutoConfigureMockMvc(addFilters = false)
class CategoryControllerTest {

    @MockitoBean
    private CategoryService categoryService;

    @MockitoBean
    private JwtUtil jwtUtil;

    @Autowired
    private MockMvc mockMvc;

    @WithMockUser(username = "user123")
    @Test
    void getAllCategoriesForUser() throws Exception {
        String username = "user123";

        Category category1 = Category.builder()
                .categoryId("cat123")
                .name("Other")
                .build();

        Category category2 = Category.builder()
                .categoryId("123cat")
                .name("Other1")
                .build();

        Category category3 = Category.builder()
                .categoryId("c1a2t3")
                .name("Other2")
                .build();

        when(categoryService.getAllCategoriesForUser(username)).thenReturn(List.of(category1, category2, category3));

        mockMvc.perform(get("/api/categories")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].categoryId").value(category1.getCategoryId()))
                .andExpect(jsonPath("$[0].userId").value(category1.getUserId()))
                .andExpect(jsonPath("$[0].name").value(category1.getName()))
                .andExpect(jsonPath("$[1].categoryId").value(category2.getCategoryId()))
                .andExpect(jsonPath("$[1].userId").value(category2.getUserId()))
                .andExpect(jsonPath("$[1].name").value(category2.getName()))
                .andExpect(jsonPath("$[2].categoryId").value(category3.getCategoryId()))
                .andExpect(jsonPath("$[2].userId").value(category3.getUserId()))
                .andExpect(jsonPath("$[2].name").value(category3.getName()));

        verify(categoryService, times(1)).getAllCategoriesForUser(username);
    }

    @WithMockUser(username = "user123")
    @Test
    void updateCategoryForUser() throws Exception {
        String username = "user123";
        String categoryId = "category123";

        Category existingCategory = Category.builder()
                .categoryId(categoryId)
                .name("Free time")
                .build();

        CategoryDTO updatedDTO = CategoryDTO.builder()
                .name("Other")
                .build();

        Category updatedCategory = Category.builder()
                .categoryId(categoryId)
                .name("Other")
                .build();

        when(categoryService.updateCategoryForUser(eq(username), eq(categoryId), any(CategoryDTO.class)))
                .thenReturn(Optional.of(updatedCategory));

        mockMvc.perform(put("/api/categories/" + categoryId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                    {
                      "name": "Other"
                    }
                    """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Other"));

        verify(categoryService).updateCategoryForUser(eq(username), eq(categoryId), any(CategoryDTO.class));
    }

    @WithMockUser(username = "user123")
    @Test
    void createCategoryForUserName() throws Exception {
        String username = "user123";

        CategoryDTO mockCategoryDTO = CategoryDTO.builder()
                .name("Test")
                .build();

        Category mockCategory = Category.builder()
                .name(mockCategoryDTO.getName())
                .build();

        when(categoryService.createCategoryForUserName(username, mockCategoryDTO)).thenReturn(mockCategory);

        mockMvc.perform(post("/api/categories")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                            {
                            "name": "Test"
                            }
                        """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value(mockCategory.getName()));
    }

    @WithMockUser(username = "user123")
    @Test
    void deleteCategoryById() throws Exception {
        String username = "user123";

        Category mockCategory = Category.builder()
                .categoryId("category1234")
                .name("Test")
                .build();

        when(categoryService.deleteCategoryById(username, mockCategory.getCategoryId())).thenReturn(true);

        mockMvc.perform(delete("/api/categories/category1234"))
                .andExpect(status().isOk());

        verify(categoryService, times(1)).deleteCategoryById(username, mockCategory.getCategoryId());
    }
}