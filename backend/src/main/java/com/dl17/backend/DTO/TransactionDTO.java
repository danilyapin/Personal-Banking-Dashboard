package com.dl17.backend.DTO;

import com.dl17.backend.Model.Transaction.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TransactionDTO {
    private double amount;
    private TransactionType type;
    private String description;
    private String categoryId;
}
