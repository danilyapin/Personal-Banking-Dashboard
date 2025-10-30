package com.dl17.backend.Service;

import com.dl17.backend.DTO.TransactionDTO;
import com.dl17.backend.Model.Account.Account;
import com.dl17.backend.Model.Transaction.Transaction;
import com.dl17.backend.Model.Transaction.TransactionType;
import com.dl17.backend.Repository.AccountRepository;
import com.dl17.backend.Repository.TransactionRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
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
                .userId(username)
                .accountId(account.getAccountId())
                .amount(100)
                .type(TransactionType.EXPENSE)
                .categoryId("Food")
                .date(LocalDateTime.now())
                .description("Lunch")
                .build();

        Transaction transaction2 = Transaction.builder()
                .transactionId("t2")
                .userId(username)
                .accountId(account.getAccountId())
                .amount(400)
                .type(TransactionType.INCOME)
                .categoryId("Hobby")
                .date(LocalDateTime.now())
                .description("Sport")
                .build();

        when(accountRepository.findById(account.getAccountId())).thenReturn(Optional.of(account));
        when(transactionRepository.findByAccountIdOrderByDateDesc(accountId))
                .thenReturn(List.of(transaction1, transaction2));

        List<Transaction> result = transactionService.getTransactionsByAccount(username, accountId);

        assertThat(result).isEqualTo(List.of(transaction1, transaction2));
        assertThat(result.get(0).getTransactionId()).isEqualTo(transaction1.getTransactionId());
        assertThat(result.get(0).getUserId()).isEqualTo(transaction1.getUserId());
        assertThat(result.get(0).getCategoryId()).isEqualTo(transaction1.getCategoryId());
        assertThat(result.get(0).getAccountId()).isEqualTo(transaction1.getAccountId());
        assertThat(result.get(1).getTransactionId()).isEqualTo(transaction2.getTransactionId());
        assertThat(result.get(1).getCategoryId()).isEqualTo(transaction2.getCategoryId());
        assertThat(result.get(1).getAccountId()).isEqualTo(transaction2.getAccountId());

        verify(transactionRepository, times(1)).findByAccountIdOrderByDateDesc(accountId);
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
                .type(TransactionType.EXPENSE)
                .categoryId("")
                .date(LocalDateTime.now())
                .description("Paycheck")
                .build();

        when(accountRepository.findById(accountId)).thenReturn(Optional.of(account));
        when(transactionRepository.findById(transactionId)).thenReturn(Optional.of(transaction));

        Optional<Transaction> result = transactionService.getTransactionById(username, accountId, transactionId);

        assertTrue(result.isPresent());
        assertThat(result.get().getCategoryId()).isEqualTo(transaction.getCategoryId());
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

        TransactionDTO dto = TransactionDTO.builder()
                .amount(500)
                .type(TransactionType.EXPENSE)
                .description("Groceries")
                .categoryId("Supermarket")
                .build();

        Transaction savedTransaction = Transaction.builder()
                .transactionId("t1")
                .accountId(accountId)
                .amount(dto.getAmount())
                .type(dto.getType())
                .categoryId(dto.getCategoryId())
                .date(LocalDateTime.now())
                .description(dto.getDescription())
                .build();

        when(accountRepository.findById(accountId)).thenReturn(Optional.of(account));
        when(transactionRepository.save(any(Transaction.class))).thenReturn(savedTransaction);

        Transaction result = transactionService.createTransaction(username, accountId, dto);

        assertThat(result.getTransactionId()).isEqualTo(savedTransaction.getTransactionId());
        assertThat(result.getCategoryId()).isEqualTo(savedTransaction.getCategoryId());
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