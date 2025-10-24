package com.dl17.backend.Repository;

import com.dl17.backend.Model.Transaction.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends MongoRepository<Transaction, String> {
    List<Transaction> findByAccountIdOrderByDateDesc(String accountId);
    List<Transaction> findByAccountIdInOrderByDateDesc(List<String> accountIds);

    List<Transaction> findByAccountId(String accountId);
}
