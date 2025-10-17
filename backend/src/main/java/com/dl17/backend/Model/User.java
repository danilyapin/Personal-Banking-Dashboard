package com.dl17.backend.Model;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class User {
    private String id;
    private String username;
    private String email;
    private String password;
}
