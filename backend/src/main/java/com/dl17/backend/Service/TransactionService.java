package com.dl17.backend.Service;

import com.dl17.backend.DTO.TransactionDTO;
import com.dl17.backend.Model.Account.Account;
import com.dl17.backend.Model.Transaction.Transaction;
import com.dl17.backend.Repository.AccountRepository;
import com.dl17.backend.Repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;

    public TransactionService(TransactionRepository transactionRepository, AccountRepository accountRepository) {
        this.transactionRepository = transactionRepository;
        this.accountRepository = accountRepository;
    }

    public List<Transaction> getAllTransactionsForUser(String username) {
        List<Account> accounts = accountRepository.findByUserId(username);
        List<String> accountIds = accounts.stream()
                .map(Account::getAccountId)
                .toList();
        return transactionRepository.findByAccountIdInOrderByDateDesc(accountIds);
    }

    public List<Transaction> getTransactionsByAccount(String username, String accountId) {
        verifyAccountOwnership(username, accountId);
        return transactionRepository.findByAccountIdOrderByDateDesc(accountId);
    }

    public Optional<Transaction> getTransactionById(String username, String accountId, String transactionId) {
        verifyAccountOwnership(username, accountId);
        return transactionRepository.findById(transactionId)
                .filter(t -> accountId.equals(t.getAccountId()));
    }

    public Transaction createTransaction(String username, String accountId, TransactionDTO dto) {
        verifyAccountOwnership(username, accountId);
        Transaction transaction = Transaction.builder()
                .userId(username)
                .accountId(accountId)
                .categoryId(dto.getCategoryId())
                .amount(dto.getAmount())
                .type(dto.getType())
                .date(LocalDateTime.now())
                .description(dto.getDescription())
                .build();
        return transactionRepository.save(transaction);
    }

    public boolean deleteTransactionById(String username, String accountId, String transactionId) {
        verifyAccountOwnership(username, accountId);
        Optional<Transaction> transaction = transactionRepository.findById(transactionId)
                .filter(t -> accountId.equals(t.getAccountId()));
        if (transaction.isPresent()) {
            transactionRepository.deleteById(transactionId);
            return true;
        } else {
            return false;
        }
    }

    private void verifyAccountOwnership(String username, String accountId) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found."));
        if (!account.getUserId().equals(username)) {
            throw new RuntimeException("Unauthorized: account does not belong to user.");
        }
    }
}