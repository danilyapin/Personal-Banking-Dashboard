package com.dl17.backend.Controller;

import com.dl17.backend.Config.SecurityConfig;
import com.dl17.backend.DTO.AccountDTO;
import com.dl17.backend.Model.Account;
import com.dl17.backend.Service.AccountService;
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

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(AccountController.class)
@Import(SecurityConfig.class)
@AutoConfigureMockMvc(addFilters = false)
class AccountControllerTest {

    @MockitoBean
    private AccountService accountService;

    @MockitoBean
    private JwtUtil jwtUtil;

    @Autowired
    private MockMvc mockMvc;

    @WithMockUser(username = "user1234")
    @Test
    void getAccounts() throws Exception {
        Account mockAccount = new Account();
        mockAccount.setAccountId("1234");
        mockAccount.setUserId("user1234");
        mockAccount.setName("Main Account");
        mockAccount.setType("SAVINGS");
        mockAccount.setBalance(500.0);

        Account mockAccount1 = new Account();
        mockAccount1.setAccountId("4321");
        mockAccount1.setUserId("user1234");
        mockAccount1.setName("Second Account");
        mockAccount1.setType("FOOD");
        mockAccount1.setBalance(200.0);

        when(accountService.getAccountsByUsername("user1234")).thenReturn(List.of(mockAccount, mockAccount1));

        mockMvc.perform(get("/api/accounts")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].accountId").value(mockAccount.getAccountId()))
                .andExpect(jsonPath("$[0].userId").value(mockAccount.getUserId()))
                .andExpect(jsonPath("$[0].name").value(mockAccount.getName()))
                .andExpect(jsonPath("$[0].type").value(mockAccount.getType()))
                .andExpect(jsonPath("$[0].balance").value(mockAccount.getBalance()))
                .andExpect(jsonPath("$[1].accountId").value(mockAccount1.getAccountId()))
                .andExpect(jsonPath("$[1].userId").value(mockAccount1.getUserId()))
                .andExpect(jsonPath("$[1].name").value(mockAccount1.getName()))
                .andExpect(jsonPath("$[1].type").value(mockAccount1.getType()))
                .andExpect(jsonPath("$[1].balance").value(mockAccount1.getBalance()));
    }

    @WithMockUser(username = "user1234")
    @Test
    void getAccountById() throws Exception {
        Account mockAccount = new Account();
        mockAccount.setAccountId("1234");
        mockAccount.setUserId("user1234");
        mockAccount.setName("Main Account");
        mockAccount.setType("SAVINGS");
        mockAccount.setBalance(500.0);

        when(accountService.getAccountById(mockAccount.getUserId(), mockAccount.getAccountId())).thenReturn(Optional.of(mockAccount));

        mockMvc.perform(get("/api/accounts/1234")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accountId").value(mockAccount.getAccountId()))
                .andExpect(jsonPath("$.userId").value(mockAccount.getUserId()))
                .andExpect(jsonPath("$.name").value(mockAccount.getName()))
                .andExpect(jsonPath("$.type").value(mockAccount.getType()))
                .andExpect(jsonPath("$.balance").value(mockAccount.getBalance()));
    }

    @WithMockUser(username = "user1234")
    @Test
    void createAccount() throws Exception {
        AccountDTO mockAccountDTO = new AccountDTO();
        mockAccountDTO.setName("Main Account");
        mockAccountDTO.setType("SAVINGS");
        mockAccountDTO.setBalance(500.0);

        Account mockAccount = new Account();
        mockAccount.setAccountId("1234");
        mockAccount.setUserId("user1234");
        mockAccount.setName(mockAccountDTO.getName());
        mockAccount.setType(mockAccountDTO.getType());
        mockAccount.setBalance(mockAccountDTO.getBalance());

        when(accountService.createAccountForUsername(mockAccount.getUserId(), mockAccountDTO)).thenReturn(mockAccount);

        mockMvc.perform(post("/api/accounts")
                .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                    {
                                     "name": "Main Account",
                                     "type": "SAVINGS",
                                     "balance": 500.0
                                     }
                                    """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.accountId").value(mockAccount.getAccountId()))
                .andExpect(jsonPath("$.userId").value(mockAccount.getUserId()))
                .andExpect(jsonPath("$.name").value(mockAccount.getName()))
                .andExpect(jsonPath("$.type").value(mockAccount.getType()))
                .andExpect(jsonPath("$.balance").value(mockAccount.getBalance()));
    }

    @WithMockUser(username = "user1234")
    @Test
    void updateAccount() throws Exception {
        AccountDTO mockAccountDTO = new AccountDTO();
        mockAccountDTO.setName("Main Account");
        mockAccountDTO.setType("SAVINGS");
        mockAccountDTO.setBalance(500.0);

        Account mockAccount = new Account();
        mockAccount.setAccountId("1234");
        mockAccount.setUserId("user1234");
        mockAccount.setName(mockAccountDTO.getName());
        mockAccount.setType(mockAccountDTO.getType());
        mockAccount.setBalance(mockAccountDTO.getBalance());

        when(accountService.updateAccountForUsername(eq(mockAccount.getUserId()), eq(mockAccount.getAccountId()), any(AccountDTO.class))).thenReturn(Optional.of(mockAccount));

        mockMvc.perform(put("/api/accounts/1234")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                         "name": "Main Account12345",
                         "type": "SAVINGS12345",
                         "balance": 1500.0
                         }
  
                        """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accountId").value(mockAccount.getAccountId()))
                .andExpect(jsonPath("$.userId").value(mockAccount.getUserId()))
                .andExpect(jsonPath("$.name").value(mockAccount.getName()))
                .andExpect(jsonPath("$.type").value(mockAccount.getType()))
                .andExpect(jsonPath("$.balance").value(mockAccount.getBalance()));
    }

    @WithMockUser(username = "user1234")
    @Test
    void deleteAccountById() throws Exception {
        AccountDTO mockAccountDTO = new AccountDTO();
        mockAccountDTO.setName("Main Account");
        mockAccountDTO.setType("SAVINGS");
        mockAccountDTO.setBalance(500.0);

        Account mockAccount = new Account();
        mockAccount.setAccountId("1234");
        mockAccount.setUserId("user1234");
        mockAccount.setName(mockAccountDTO.getName());
        mockAccount.setType(mockAccountDTO.getType());
        mockAccount.setBalance(mockAccountDTO.getBalance());

        when(accountService.createAccountForUsername(mockAccount.getUserId(), mockAccountDTO)).thenReturn(mockAccount);

        when(accountService.deleteAccountByUsername(mockAccount.getUserId(), mockAccount.getAccountId())).thenReturn(true);

        mockMvc.perform(delete("/api/accounts/1234"))
                .andExpect(status().isOk());

        verify(accountService).deleteAccountByUsername(mockAccount.getUserId(), mockAccount.getAccountId());
    }
}