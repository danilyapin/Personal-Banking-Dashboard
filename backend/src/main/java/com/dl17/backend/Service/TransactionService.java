package com.dl17.backend.Service;

import com.dl17.backend.DTO.TransactionDTO;
import com.dl17.backend.Exception.TransactionNotFoundException;
import com.dl17.backend.Model.Transaction;
import com.dl17.backend.Repository.TransactionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionException;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public List<Transaction> getTransactions() {
        return transactionRepository.findAll();

    }

    public Optional<Transaction> getTransactionById(String id) {
        if(transactionRepository.findById(id).isPresent()){
            return transactionRepository.findById(id);
        } else {
            return Optional.empty();
        }
    }

    public Transaction createTransaction(TransactionDTO transactionDTO) {
        Transaction transaction = Transaction.builder()
                .amount(transactionDTO.getAmount())
                .type(transactionDTO.getType())
                .category(transactionDTO.getCategory())
                .date(transactionDTO.getDate())
                .description(transactionDTO.getDescription()).build();

        return transactionRepository.save(transaction);
    }

    public void deleteTransactionById(String id) {
        if(transactionRepository.findById(id).isPresent()){
            transactionRepository.deleteById(id);
        } else {
            throw new TransactionNotFoundException("Transaction not found");
        }
    }
}
