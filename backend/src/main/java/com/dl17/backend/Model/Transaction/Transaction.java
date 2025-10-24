package com.dl17.backend.Model.Transaction;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "transactions")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Transaction {

    @Id
    private String transactionId;

    private String userId;
    private String accountId;
    private String categoryId;
    private double amount;
    private TransactionType type;
    private LocalDateTime date;
    private String description;
}
