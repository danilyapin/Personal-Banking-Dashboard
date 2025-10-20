package com.dl17.backend.Service;

import com.dl17.backend.DTO.TransactionDTO;
import com.dl17.backend.Model.Account;
import com.dl17.backend.Model.Transaction;
import com.dl17.backend.Repository.AccountRepository;
import com.dl17.backend.Repository.TransactionRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class TransactionServiceTest {

    private final TransactionRepository transactionRepository = Mockito.mock(TransactionRepository.class);
    private final AccountRepository accountRepository = Mockito.mock(AccountRepository.class);
    private final TransactionService transactionService = new TransactionService(transactionRepository, accountRepository);

    @Test
    void getTransactionsByAccount() {
        String username = "user1";
        String accountId = "abc123";

        Account account = Account.builder()
                .accountId(accountId)
                .userId(username)
                .balance(500)
                .build();

        Transaction transaction1 = Transaction.builder()
                .transactionId("t1")
                .accountId(accountId)
                .amount(100)
                .type("Expense")
                .category("Food")
                .date(LocalDate.now())
                .description("Lunch")
                .build();

        Transaction transaction2 = Transaction.builder()
                .transactionId("t2")
                .accountId(accountId)
                .amount(400)
                .type("Expense")
                .category("Hobby")
                .date(LocalDate.now())
                .description("Sport")
                .build();

        when(accountRepository.findById(accountId)).thenReturn(Optional.of(account));
        when(transactionRepository.findByAccountId(accountId)).thenReturn(List.of(transaction1, transaction2));

        List<Transaction> result = transactionService.getTransactionsByAccount(username, accountId);

        assertThat(result.get(0).getTransactionId()).isEqualTo("t1");
        assertThat(result.get(0).getCategory()).isEqualTo(transaction1.getCategory());
        assertThat(result.get(0).getAccountId()).isEqualTo(transaction1.getAccountId());
        assertThat(result.get(1).getTransactionId()).isEqualTo("t2");
        assertThat(result.get(1).getCategory()).isEqualTo(transaction2.getCategory());
        assertThat(result.get(1).getAccountId()).isEqualTo(transaction2.getAccountId());
        verify(transactionRepository, times(1)).findByAccountId(accountId);
    }

    @Test
    void getTransactionById() {
        String username = "user1";
        String accountId = "abc123";
        String transactionId = "t1";

        Account account = Account.builder()
                .accountId(accountId)
                .userId(username)
                .balance(500)
                .build();

        Transaction transaction = Transaction.builder()
                .transactionId(transactionId)
                .accountId(accountId)
                .amount(200)
                .type("Income")
                .category("Salary")
                .date(LocalDate.now())
                .description("Paycheck")
                .build();

        when(accountRepository.findById(accountId)).thenReturn(Optional.of(account));
        when(transactionRepository.findById(transactionId)).thenReturn(Optional.of(transaction));

        Optional<Transaction> result = transactionService.getTransactionById(username, accountId, transactionId);

        assertTrue(result.isPresent());
        assertThat(result.get().getCategory()).isEqualTo(transaction.getCategory());
        verify(transactionRepository, times(1)).findById(transactionId);
    }

    @Test
    void createTransaction() {
        String username = "user1";
        String accountId = "acc123";

        Account account = Account.builder()
                .accountId(accountId)
                .userId(username)
                .balance(500)
                .build();

        TransactionDTO dto = new TransactionDTO(250, "Girocard", "Groceries", "Supermarket");

        Transaction savedTransaction = Transaction.builder()
                .transactionId("t1")
                .accountId(accountId)
                .amount(dto.getAmount())
                .type(dto.getType())
                .category(dto.getCategory())
                .date(LocalDate.now())
                .description(dto.getDescription())
                .build();

        when(accountRepository.findById(accountId)).thenReturn(Optional.of(account));
        when(transactionRepository.save(any(Transaction.class))).thenReturn(savedTransaction);

        Transaction result = transactionService.createTransaction(username, accountId, dto);

        assertThat(result.getTransactionId()).isEqualTo("t1");
        assertThat(result.getCategory()).isEqualTo("Groceries");
        verify(transactionRepository, times(1)).save(any(Transaction.class));
    }

    @Test
    void deleteTransactionById_WhenNotFound() {
        String username = "user1";
        String accountId = "acc123";
        String transactionId = "t1";

        Account account = Account.builder()
                .accountId(accountId)
                .userId(username)
                .balance(500)
                .build();

        when(accountRepository.findById(accountId)).thenReturn(Optional.of(account));
        when(transactionRepository.findById(transactionId)).thenReturn(Optional.empty());

        boolean result = transactionService.deleteTransactionById(username, accountId, transactionId);

        assertFalse(result);
        verify(transactionRepository, never()).deleteById(any());
    }

    @Test
    void deleteTransactionById_WhenFound() {
        String username = "user1";
        String accountId = "acc123";
        String transactionId = "t1";

        Account account = Account.builder()
                .accountId(accountId)
                .userId(username)
                .balance(500)
                .build();

        Transaction transaction = Transaction.builder()
                .transactionId(transactionId)
                .accountId(accountId)
                .amount(20)
                .build();

        when(accountRepository.findById(accountId)).thenReturn(Optional.of(account));
        when(transactionRepository.findById(transactionId)).thenReturn(Optional.of(transaction));

        boolean result = transactionService.deleteTransactionById(username, accountId, transactionId);
        assertTrue(result);
        verify(transactionRepository).deleteById(transactionId);
    }
}