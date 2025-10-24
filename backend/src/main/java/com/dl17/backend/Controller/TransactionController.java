package com.dl17.backend.Controller;

import com.dl17.backend.DTO.TransactionDTO;
import com.dl17.backend.Model.Transaction.Transaction;
import com.dl17.backend.Service.TransactionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactionsForUser() {
        String username = getLoggedInUsername();
        List<Transaction> transactions = transactionService.getAllTransactionsForUser(username);
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/account/{accountId}")
    public ResponseEntity<List<Transaction>> getTransactionsByAccount(@PathVariable String accountId) {
        String username = getLoggedInUsername();
        List<Transaction> transactions = transactionService.getTransactionsByAccount(username, accountId);
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/account/{accountId}/{id}")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable String accountId, @PathVariable String id) {
        String username = getLoggedInUsername();
        return transactionService.getTransactionById(username, accountId, id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping("/account/{accountId}")
    public ResponseEntity<Transaction> createTransaction(@PathVariable String accountId, @RequestBody TransactionDTO transactionDTO) {
        String username = getLoggedInUsername();
        Transaction transaction = transactionService.createTransaction(username, accountId, transactionDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(transaction);
    }

    @DeleteMapping("/account/{accountId}/{id}")
    public ResponseEntity<String> deleteTransactionById(@PathVariable String accountId, @PathVariable String id){
        String username = getLoggedInUsername();
        boolean deleted = transactionService.deleteTransactionById(username, accountId, id);
        if (deleted) {
            return ResponseEntity.ok("Transaction has been deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Transaction with id " + id + " was not found.");
        }
    }

    private String getLoggedInUsername(){
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
