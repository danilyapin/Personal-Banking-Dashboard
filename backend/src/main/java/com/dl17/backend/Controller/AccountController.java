package com.dl17.backend.Controller;

import com.dl17.backend.DTO.AccountDTO;
import com.dl17.backend.Exception.ThisAccountNotFoundException;
import com.dl17.backend.Model.Account;
import com.dl17.backend.Service.AccountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.AccountNotFoundException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping
    public ResponseEntity<List<Account>> getAccounts(){
        List<Account> accounts = accountService.getAccounts();
        return ResponseEntity.ok(accounts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Account>> getAccountById(@PathVariable String id){
        Optional<Account> account = accountService.getAccountById(id);
        return ResponseEntity.ok(account);
    }

    @PostMapping
    public ResponseEntity<Account> createAccount(@RequestBody AccountDTO accountDTO){
        Account created = accountService.createAccount(accountDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Account> updateAccount(@PathVariable String id, @RequestBody AccountDTO accountDTO){
        try {
            Account updated = accountService.updateAccount(id, accountDTO);
            return ResponseEntity.status(HttpStatus.OK).body(updated);
        } catch (AccountNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAccountById(@PathVariable String id) {
        try {
            accountService.deleteAccountById(id);
            return new ResponseEntity<>("Account deleted with success.", HttpStatus.OK);
        } catch (ThisAccountNotFoundException e) {
            return new ResponseEntity<>("Account not found with id: " + id, HttpStatus.NOT_FOUND);
        }
    }
}
