package com.dl17.backend.Controller;

import com.dl17.backend.DTO.UserDTO;
import com.dl17.backend.DTO.UserResponseDTO;
import com.dl17.backend.Model.User;
import com.dl17.backend.Service.LoginService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/login")
public class UserLogin {

    private final LoginService loginService;

    public UserLogin(LoginService loginService) {
        this.loginService = loginService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> getCurrentUser() {
        String username = getLoggedInUsername();
        User user = loginService.getUserByUserName(username);
        return ResponseEntity.ok(new UserResponseDTO(user.getUserId(), user.getUsername()));

    }

    @PostMapping
    public ResponseEntity<String> login(@RequestBody UserDTO userDTO) {
        try {
            String token = loginService.login(userDTO);
            return ResponseEntity.status(HttpStatus.OK).body(token);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    private String getLoggedInUsername(){
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
