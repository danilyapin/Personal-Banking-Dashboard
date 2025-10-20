package com.dl17.backend.Controller;

import com.dl17.backend.Config.SecurityConfig;
import com.dl17.backend.DTO.TransactionDTO;
import com.dl17.backend.Model.Transaction;
import com.dl17.backend.Service.TransactionService;
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

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(TransactionController.class)
@Import(SecurityConfig.class)
@AutoConfigureMockMvc(addFilters = false)
class TransactionControllerTest {

    @MockitoBean
    private TransactionService transactionService;

    @MockitoBean
    private JwtUtil jwtUtil;

    @Autowired
    private MockMvc mockMvc;

    @WithMockUser(username = "user1234")
    @Test
    void getTransactions() throws Exception {
        Transaction transaction1 = new Transaction();
        transaction1.setTransactionId("transaction1234");
        transaction1.setAccountId("account1234");
        transaction1.setAmount(500.0);
        transaction1.setType("Expensive");
        transaction1.setCategory("SAVINGS");
        transaction1.setDate(LocalDate.now());
        transaction1.setDescription("Some description");

        Transaction transaction2 = new Transaction();
        transaction2.setTransactionId("transaction12341");
        transaction2.setAccountId("account1234");
        transaction2.setAmount(501.0);
        transaction2.setType("Expensive1");
        transaction2.setCategory("SAVINGS1");
        transaction2.setDate(LocalDate.now());
        transaction2.setDescription("Some description1");

        when(transactionService.getTransactionsByAccount("user1234", "account1234")).thenReturn(List.of(transaction1, transaction2));

        mockMvc.perform(get("/api/accounts/account1234/transactions")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].transactionId").value("transaction1234"))
                .andExpect(jsonPath("$[0].accountId").value("account1234"))
                .andExpect(jsonPath("$[0].amount").value(500.0))
                .andExpect(jsonPath("$[0].type").value("Expensive"))
                .andExpect(jsonPath("$[0].category").value("SAVINGS"))
                .andExpect(jsonPath("$[0].description").value("Some description"))
                .andExpect(jsonPath("$[1].transactionId").value("transaction12341"))
                .andExpect(jsonPath("$[1].accountId").value("account1234"))
                .andExpect(jsonPath("$[1].amount").value(501.0))
                .andExpect(jsonPath("$[1].type").value("Expensive1"))
                .andExpect(jsonPath("$[1].category").value("SAVINGS1"))
                .andExpect(jsonPath("$[1].description").value("Some description1"));
    }

    @WithMockUser(username = "user1234")
    @Test
    void getTransactionById() throws Exception {
        Transaction transaction1 = new Transaction();
        transaction1.setTransactionId("transaction1234");
        transaction1.setAccountId("account1234");
        transaction1.setAmount(500.0);
        transaction1.setType("Expensive");
        transaction1.setCategory("SAVINGS");
        transaction1.setDescription("Some description");

        when(transactionService.getTransactionById("user1234", transaction1.getAccountId(), transaction1.getTransactionId())).thenReturn(Optional.of(transaction1));

        mockMvc.perform(get("/api/accounts/account1234/transactions/transaction1234")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.transactionId").value("transaction1234"))
                .andExpect(jsonPath("$.accountId").value("account1234"))
                .andExpect(jsonPath("$.amount").value(500.0))
                .andExpect(jsonPath("$.type").value("Expensive"))
                .andExpect(jsonPath("$.category").value("SAVINGS"))
                .andExpect(jsonPath("$.description").value("Some description"));

    }

    @WithMockUser(username = "user1234")
    @Test
    void createTransaction() throws Exception {
        TransactionDTO transactionDTO = new TransactionDTO();
        transactionDTO.setAmount(500.0);
        transactionDTO.setType("Expensive");
        transactionDTO.setCategory("SAVINGS");
        transactionDTO.setDescription("Some description");

        Transaction transaction = new Transaction();
        transaction.setTransactionId("transaction1234");
        transaction.setAccountId("account1234");
        transaction.setAmount(transactionDTO.getAmount());
        transaction.setType(transactionDTO.getType());
        transaction.setCategory(transactionDTO.getCategory());
        transaction.setDescription(transactionDTO.getDescription());

        when(transactionService.createTransaction("user1234", transaction.getAccountId(), transactionDTO)).thenReturn(transaction);

        mockMvc.perform(post("/api/accounts/account1234/transactions")
                .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                    {
                                    "amount": 500,
                                    "type": "Expensive",
                                    "category": "SAVINGS",
                                    "description": "Some description"
                                    }
                                    """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.transactionId").value(transaction.getTransactionId()))
                .andExpect(jsonPath("$.accountId").value(transaction.getAccountId()))
                .andExpect(jsonPath("$.amount").value(transactionDTO.getAmount()))
                .andExpect(jsonPath("$.type").value(transactionDTO.getType()))
                .andExpect(jsonPath("$.category").value(transactionDTO.getCategory()))
                .andExpect(jsonPath("$.description").value(transactionDTO.getDescription()));

    }

    @WithMockUser(username = "user1234")
    @Test
    void deleteTransactionById() throws Exception {
        TransactionDTO transactionDTO = new TransactionDTO();
        transactionDTO.setAmount(500.0);
        transactionDTO.setType("Expensive");
        transactionDTO.setCategory("SAVINGS");
        transactionDTO.setDescription("Some description");

        Transaction transaction = new Transaction();
        transaction.setTransactionId("transaction1234");
        transaction.setAccountId("account1234");
        transaction.setAmount(transactionDTO.getAmount());
        transaction.setType(transactionDTO.getType());
        transaction.setCategory(transactionDTO.getCategory());
        transaction.setDescription(transactionDTO.getDescription());

        when(transactionService.createTransaction("user1234", transaction.getAccountId(), transactionDTO)).thenReturn(transaction);

        when(transactionService.deleteTransactionById("user1234", transaction.getAccountId(), transaction.getTransactionId())).thenReturn(Boolean.TRUE);

        mockMvc.perform(delete("/api/accounts/account1234/transactions/transaction1234"))
                .andExpect(status().isOk());

        verify(transactionService).deleteTransactionById("user1234", transaction.getAccountId(), transaction.getTransactionId());
    }
}