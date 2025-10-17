package com.dl17.backend.Controller;

import com.dl17.backend.DTO.TransactionDTO;
import com.dl17.backend.Exception.TransactionNotFoundException;
import com.dl17.backend.Model.Transaction;
import com.dl17.backend.Service.TransactionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping
    public ResponseEntity<List<Transaction>> getTransactions() {
        List<Transaction> transactions = transactionService.getTransactions();
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Transaction>> getTransactionById(@PathVariable String id) {
        Optional<Transaction> transaction = transactionService.getTransactionById(id);
        return ResponseEntity.ok(transaction);
    }

    @PostMapping
    public ResponseEntity<Transaction> createTransaction(@RequestBody TransactionDTO transactionDTO) {
        Transaction transaction = transactionService.createTransaction(transactionDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(transaction);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTransactionById(@PathVariable String id) {
        try {
            transactionService.deleteTransactionById(id);
            return new ResponseEntity<>("Transaction deleted with success",HttpStatus.OK);
        } catch (TransactionNotFoundException e) {
            return new ResponseEntity<>("Transaction not found with id: " + id, HttpStatus.NOT_FOUND);
        }
    }
}
