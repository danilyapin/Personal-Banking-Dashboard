package com.dl17.backend.Service;

import com.dl17.backend.DTO.AccountDTO;
import com.dl17.backend.Model.Account;
import com.dl17.backend.Repository.AccountRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountService {

    private final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public List<Account> getAccountsByUsername(String userId) {
        return accountRepository.findByUserId(userId);
    }

    public Optional<Account> getAccountById(String userId, String accountId) {
        return accountRepository.findById(accountId)
                .filter(account -> userId.equals(account.getUserId()));
    }

    public Account createAccountForUsername(String userId, AccountDTO accountDTO) {
        Account account = Account.builder()
                .userId(userId)
                .name(accountDTO.getName())
                .type(accountDTO.getType())
                .balance(accountDTO.getBalance())
                .build();
        return accountRepository.save(account);
    }

    public Optional<Account> updateAccountForUsername(String userId, String accountId, AccountDTO accountDTO) {
        return accountRepository.findById(accountId)
                .filter(account -> userId.equals(account.getUserId()))
                .map(account ->  {
                    account.setName(accountDTO.getName());
                    account.setType(accountDTO.getType());
                    account.setBalance(accountDTO.getBalance());
                    return accountRepository.save(account);
                });
    }

    public boolean deleteAccountByUsername(String userId, String accountId) {
        Optional<Account> account = accountRepository.findById(accountId)
                .filter(a -> userId.equals(a.getUserId()));

        if (account.isPresent()) {
            accountRepository.deleteById(accountId);
            return true;
        } else {
            return false;
        }
    }
}
