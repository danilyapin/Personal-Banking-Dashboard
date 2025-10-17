package com.dl17.backend.Service;

import com.dl17.backend.DTO.AccountDTO;
import com.dl17.backend.Exception.ThisAccountNotFoundException;
import com.dl17.backend.Model.Account;
import com.dl17.backend.Repository.AccountRepository;
import org.springframework.stereotype.Service;

import javax.security.auth.login.AccountNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class AccountService {

    private final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public List<Account> getAccounts(){
        return accountRepository.findAll();
    }

    public Optional<Account> getAccountById(String id){
        if(accountRepository.findById(id).isPresent()){
            return Optional.of(accountRepository.findById(id).get());
        } else {
            return Optional.empty();
        }
    }

    public Account createAccount(AccountDTO accountDTO){
        Account account = Account.builder()
                .name(accountDTO.getName())
                .type(accountDTO.getType())
                .balance(accountDTO.getBalance())
                .build();
        return accountRepository.save(account);
    }

    public Account updateAccount(String id, AccountDTO accountDTO) throws AccountNotFoundException {

        Account account = accountRepository.findById(id).orElseThrow(() -> new AccountNotFoundException("Account not found with " + id));

        account.setName(accountDTO.getName());
        account.setType(accountDTO.getType());
        account.setBalance(accountDTO.getBalance());

        return accountRepository.save(account);
    }

    public void deleteAccountById(String id) {
        if(accountRepository.findById(id).isPresent()){
            accountRepository.deleteById(id);
        } else {
            throw new ThisAccountNotFoundException("Account not found with id: " + id);
        }
    }
}
