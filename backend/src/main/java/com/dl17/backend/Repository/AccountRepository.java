package com.dl17.backend.Repository;

import com.dl17.backend.Model.Account.Account;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends MongoRepository<Account,String> {
    List<Account> findByUserId(String userId);
}
