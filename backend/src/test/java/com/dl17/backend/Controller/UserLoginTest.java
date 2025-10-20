package com.dl17.backend.Controller;

import com.dl17.backend.Config.SecurityConfig;
import com.dl17.backend.DTO.UserDTO;
import com.dl17.backend.Model.User;
import com.dl17.backend.Service.LoginService;
import com.dl17.backend.Util.JwtUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserLogin.class)
@Import(SecurityConfig.class)
@AutoConfigureMockMvc(addFilters = false)
class UserLoginTest {

    @MockitoBean
    private LoginService loginService;

    @MockitoBean
    private JwtUtil jwtUtil;

    @Autowired
    private MockMvc mockMvc;

    @WithMockUser(username = "user1234")
    @Test
    void login() throws Exception {
        UserDTO mockUserDTO = new UserDTO();
        mockUserDTO.setUsername("username1234");
        mockUserDTO.setPassword("password1234");

        when(loginService.login(mockUserDTO)).thenReturn("token1234");

        mockMvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                        "username": "username1234",
                        "password": "password1234"
                        }
                        """))
                        .andExpect(content().string("Token: token1234"));

        verify(loginService, times(1)).login(mockUserDTO);
    }
}