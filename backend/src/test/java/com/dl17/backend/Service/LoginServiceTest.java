package com.dl17.backend.Service;

import com.dl17.backend.DTO.UserDTO;
import com.dl17.backend.Model.User;
import com.dl17.backend.Repository.UserRepository;
import com.dl17.backend.Util.JwtUtil;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class LoginServiceTest {

    private final UserRepository userRepository = mock(UserRepository.class);
    private final BCryptPasswordEncoder bCryptPasswordEncoder = mock(BCryptPasswordEncoder.class);
    private final JwtUtil jwtUtil = mock(JwtUtil.class);
    private final LoginService loginService = new LoginService(userRepository, bCryptPasswordEncoder, jwtUtil);

    @Test
    void login() {
        UserDTO userDTO = new UserDTO("username", "password");
        User user = User.builder()
                        .userId("abc123")
                        .username(userDTO.getUsername())
                        .password("encodedPassword")
                        .build();

        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
        when(bCryptPasswordEncoder.matches(userDTO.getPassword(), user.getPassword())).thenReturn(true);
        when(jwtUtil.generateToken(user.getUsername())).thenReturn("token");

        String result = loginService.login(userDTO);

        assertEquals("token", result);
        assertEquals("username", user.getUsername());

        verify(userRepository, times(1)).findByUsername(user.getUsername());
        verify(bCryptPasswordEncoder, times(1)).matches(userDTO.getPassword(), user.getPassword());
        verify(jwtUtil, times(1)).generateToken(user.getUsername());
    }

    @Test
    void getUserByUserName() {
        User mockUser = User.builder()
                .userId("user123")
                .username("Test123")
                .build();

        when(userRepository.findByUsername(mockUser.getUsername())).thenReturn(Optional.of(mockUser));

        assertEquals(mockUser, loginService.getUserByUserName("Test123"));

        verify(userRepository, times(1)).findByUsername(mockUser.getUsername());
    }
}