package com.dl17.backend.Controller;

import com.dl17.backend.DTO.UserDTO;
import com.dl17.backend.Service.LoginService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/login")
public class UserLogin {

    private final LoginService loginService;

    public UserLogin(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping
    public ResponseEntity<?> login(@RequestBody UserDTO userDTO) {
        try {
            String token = loginService.login(userDTO);
            return ResponseEntity.status(HttpStatus.OK).body("Token: " + token);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
}
