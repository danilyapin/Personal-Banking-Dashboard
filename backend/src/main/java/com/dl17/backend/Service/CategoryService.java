package com.dl17.backend.Service;

import com.dl17.backend.DTO.CategoryDTO;
import com.dl17.backend.Model.Account.Account;
import com.dl17.backend.Model.Category;
import com.dl17.backend.Repository.AccountRepository;
import com.dl17.backend.Repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final AccountRepository accountRepository;

    public CategoryService(CategoryRepository categoryRepository, AccountRepository accountRepository) {
        this.categoryRepository = categoryRepository;
        this.accountRepository = accountRepository;
    }

    public List<Category> getAllCategoriesForUser(String username) {
        return categoryRepository.findByUserId(username);
    }

    public Optional<Category> updateCategoryForUser(String username, String categoryId, CategoryDTO categoryDTO) {
        return categoryRepository.findById(categoryId)
                .filter(c -> c.getUserId().equals(username))
                .map(c -> {
                    c.setName(categoryDTO.getName());
                    return categoryRepository.save(c);
                });
    }

    public Category createCategoryForUserName(String username, CategoryDTO categoryDTO) {
        Category category = Category.builder()
                .userId(username)
                .name(categoryDTO.getName())
                .build();
        return categoryRepository.save(category);

    }

    public boolean deleteCategoryById(String username, String categoryId) {
        verifyAccountOwnership(username, categoryId);
        Optional<Category> category = categoryRepository.findById(categoryId)
                .filter(c -> c.getUserId().equals(username));
        if (category.isPresent()) {
            categoryRepository.deleteById(categoryId);
            return true;
        } else {
            return false;
        }
    }

    private void verifyAccountOwnership(String username, String categoryId) {
        Account account = accountRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Account not found."));
        if (!account.getUserId().equals(username)) {
            throw new RuntimeException("Unauthorized: account does not belong to user.");
        }
    }
}
