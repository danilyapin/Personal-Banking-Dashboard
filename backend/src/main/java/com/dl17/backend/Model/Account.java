package com.dl17.backend.Model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "accounts")
public class Account {

    @Id
    private String accountId;

    private String userId;
    private String name;
    private String type;
    private double balance;
}

