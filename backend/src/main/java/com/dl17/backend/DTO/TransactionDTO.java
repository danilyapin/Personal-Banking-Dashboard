package com.dl17.backend.DTO;

import lombok.Data;

import java.time.LocalDate;

@Data
public class TransactionDTO {
    private double amount;
    private String type;
    private String category;
    private LocalDate date;
    private String description;
}
