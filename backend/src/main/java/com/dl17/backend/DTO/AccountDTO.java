package com.dl17.backend.DTO;

import com.dl17.backend.Model.Account.AccountType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AccountDTO {
    private String name;
    private AccountType type;
    private double balance;
}
