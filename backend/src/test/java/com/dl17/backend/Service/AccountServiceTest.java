package com.dl17.backend.Service;

import com.dl17.backend.DTO.AccountDTO;
import com.dl17.backend.Model.Account;
import com.dl17.backend.Repository.AccountRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AccountServiceTest {

    private final AccountRepository accountRepository = Mockito.mock(AccountRepository.class);
    private final AccountService accountService = new AccountService(accountRepository);

    @Test
    void createAccountForUsername() {
        AccountDTO accountDTO = new AccountDTO("Testkonto", "Savings", 500.0);
        Account savedAccount = Account.builder()
                .accountId("abc123")
                .userId("user1")
                .name(accountDTO.getName())
                .type(accountDTO.getType())
                .balance(accountDTO.getBalance())
                .build();

        when(accountRepository.save(any(Account.class))).thenReturn(savedAccount);

        Account result = accountService.createAccountForUsername("user1", accountDTO);

        assertThat(result.getAccountId()).isEqualTo(savedAccount.getAccountId());
        assertThat(result.getName()).isEqualTo(savedAccount.getName());
        assertThat(result.getBalance()).isEqualTo(savedAccount.getBalance());
        verify(accountRepository, times(1)).save(any(Account.class));

    }

    @Test
    void getAccountById() {
        Account account = Account.builder()
                .accountId("abc123")
                .userId("user1")
                .name("Main account")
                .type("Debit")
                .balance(500.0)
                .build();

        when(accountRepository.findById("abc123")).thenReturn(Optional.of(account));

        Optional<Account> result = accountService.getAccountById(account.getUserId(), account.getAccountId());
        assertTrue(result.isPresent());
        assertEquals("user1", result.get().getUserId());
        verify(accountRepository, times(1)).findById("abc123");
    }

    @Test
    void getAccountsByUsername() {
        Account account1 = Account.builder()
                .accountId("abc123")
                .userId("user1")
                .name("Main account")
                .type("Debit")
                .balance(500.0)
                .build();

        Account account2 = Account.builder()
                .accountId("abc1234")
                .userId("user1")
                .name("Main account")
                .type("Debit")
                .balance(500.0)
                .build();

        when(accountRepository.findByUserId("user1")).thenReturn(List.of(account1, account2));

        List<Account> result = accountService.getAccountsByUsername("user1");

        assertThat(result).isEqualTo(List.of(account1, account2));
        assertThat(result.get(0).getUserId()).isEqualTo("user1");
        assertThat(result.get(1).getUserId()).isEqualTo("user1");
        verify(accountRepository, times(1)).findByUserId("user1");
    }

    @Test
    void updateAccountForUsername() {
        Account account1 = Account.builder()
                .accountId("abc123")
                .userId("user1")
                .name("Main account")
                .type("Debit")
                .balance(500.0)
                .build();

        AccountDTO dto = new AccountDTO("NewName", "Savings", 500.0);

        when(accountRepository.findById("abc123")).thenReturn(Optional.of(account1));
        when(accountRepository.save(any(Account.class))).thenReturn(account1);

        Optional<Account> result = accountService.updateAccountForUsername(account1.getUserId(), account1.getAccountId(), dto);

        assertThat(result.get().getName()).isEqualTo(dto.getName());
        assertThat(result.get().getType()).isEqualTo(dto.getType());
        assertThat(result.get().getBalance()).isEqualTo(dto.getBalance());
        verify(accountRepository, times(1)).save(account1);
    }

    @Test
    void deleteAccountByUsername() {
        Account account1 = Account.builder()
                .accountId("abc123")
                .userId("user1")
                .name("Main account")
                .type("Debit")
                .balance(500.0)
                .build();

        when(accountRepository.findById("abc123")).thenReturn(Optional.of(account1));

       accountService.deleteAccountByUsername(account1.getUserId(), account1.getAccountId());

        verify(accountRepository).deleteById(account1.getAccountId());
    }
}