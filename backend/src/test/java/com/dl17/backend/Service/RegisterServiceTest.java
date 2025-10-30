package com.dl17.backend.Service;

import com.dl17.backend.DTO.UserDTO;
import com.dl17.backend.Model.User;
import com.dl17.backend.Repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
class RegisterServiceTest {

    private final UserRepository userRepository = Mockito.mock(UserRepository.class);
    private final PasswordEncoder passwordEncoder = Mockito.mock(PasswordEncoder.class);
    private final RegisterService registerService = new RegisterService(passwordEncoder, userRepository);

    @Test
    void registerUser() {
        UserDTO userDTO = new UserDTO("username", "password");

        when(passwordEncoder.encode(userDTO.getPassword())).thenReturn("encodedPassword");

        when(userRepository.findByUsername(userDTO.getUsername())).thenReturn(Optional.empty());
        when(userRepository.save(any(User.class))).thenAnswer(i -> i.getArguments()[0]);

        User result = registerService.registerUser(userDTO);

        assertEquals("username", result.getUsername());
        assertEquals("encodedPassword", result.getPassword());

        verify(userRepository, times(1)).save(any(User.class));
    }
}