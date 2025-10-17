package com.dl17.backend.Model;

import lombok.Data;

import java.time.LocalDate;

@Data
public class Transaction {
    private String id;
    private String accountId;
    private double amount;
    private String type;
    private String category;
    private LocalDate date;
    private String description;
}
