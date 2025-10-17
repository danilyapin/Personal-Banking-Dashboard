package com.dl17.backend.Model;

import lombok.*;

@Data
public class Account {
    private String id;
    private String userId;
    private String name;
    private String type;
    private double balance;
}

