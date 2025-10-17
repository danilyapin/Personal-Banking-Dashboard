package com.dl17.backend.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@AllArgsConstructor
@Getter
@Setter
public class User {
    private String id;
    private String name;
    private String email;
    private String password;
}
