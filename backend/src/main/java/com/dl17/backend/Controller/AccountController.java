package com.dl17.backend.Controller;

import com.dl17.backend.DTO.AccountDTO;
import com.dl17.backend.Model.Account;
import com.dl17.backend.Service.AccountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping
    public ResponseEntity<List<Account>> getAccounts() {
        String username = getLoggedInUsername();
        List<Account> accounts = accountService.getAccountsByUsername(username);
        return ResponseEntity.ok(accounts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Account> getAccountById(@PathVariable String id) {
        String username = getLoggedInUsername();
        return accountService.getAccountById(username, id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<Account> createAccount(@RequestBody AccountDTO accountDTO) {
        String username = getLoggedInUsername();
        Account created = accountService.createAccountForUsername(username, accountDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Account> updateAccount(@PathVariable String id, @RequestBody AccountDTO accountDTO) {
        String username = getLoggedInUsername();
        return accountService.updateAccountForUsername(username, id, accountDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAccountById(@PathVariable String id) {
        String username = getLoggedInUsername();
        boolean deleted = accountService.deleteAccountByUsername(username, id);
        if (deleted) {
            return ResponseEntity.ok("Account deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Account with id " + id + " not found.");
        }
    }

    private String getLoggedInUsername(){
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}