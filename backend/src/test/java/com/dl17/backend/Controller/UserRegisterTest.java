package com.dl17.backend.Controller;

import com.dl17.backend.Config.SecurityConfig;
import com.dl17.backend.DTO.UserDTO;
import com.dl17.backend.Model.User;
import com.dl17.backend.Service.RegisterService;
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

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserRegister.class)
@Import(SecurityConfig.class)
@AutoConfigureMockMvc(addFilters = false)
class UserRegisterTest {

    @MockitoBean
    private RegisterService registerService;

    @MockitoBean
    private JwtUtil jwtUtil;

    @Autowired
    private MockMvc mockMvc;

    @WithMockUser(username = "user1234")
    @Test
    void registerUser() throws Exception {
        UserDTO mockUserDTO = new UserDTO();
        mockUserDTO.setUsername("username1234");
        mockUserDTO.setPassword("password1234");

        User mockUser = User.builder()
                .userId("1234567890")
                .username(mockUserDTO.getUsername())
                .password(mockUserDTO.getPassword())
                .build();

        when(registerService.registerUser(mockUserDTO)).thenReturn(mockUser);

        mockMvc.perform(post("/api/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                          {
                          "username": "username1234",
                          "password": "password1234"
                          }
                          """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.userId").value(mockUser.getUserId()))
                .andExpect(jsonPath("$.username").value(mockUser.getUsername()))
                .andExpect(jsonPath("$.password").value(mockUser.getPassword()));
    }
}