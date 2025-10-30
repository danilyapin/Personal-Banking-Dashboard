package com.dl17.backend.Controller;

import com.dl17.backend.Config.SecurityConfig;
import com.dl17.backend.DTO.TransactionDTO;
import com.dl17.backend.Model.Transaction.Transaction;
import com.dl17.backend.Model.Transaction.TransactionType;
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

import java.time.LocalDateTime;
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
    void getTransactionsByAccount() throws Exception {
        Transaction transaction1 = new Transaction();
        transaction1.setTransactionId("transaction1234");
        transaction1.setUserId("user1234");
        transaction1.setAccountId("account1234");
        transaction1.setAmount(500.0);
        transaction1.setType(TransactionType.INCOME);
        transaction1.setCategoryId("CREDIT");
        transaction1.setDate(LocalDateTime.now());
        transaction1.setDescription("Some description");

        Transaction transaction2 = new Transaction();
        transaction2.setTransactionId("transaction12341");
        transaction1.setUserId("user1234");
        transaction2.setAccountId("account1234");
        transaction2.setAmount(501.0);
        transaction2.setType(TransactionType.EXPENSE);
        transaction2.setCategoryId("CREDIT");
        transaction2.setDate(LocalDateTime.now());
        transaction2.setDescription("Some description1");

        when(transactionService.getTransactionsByAccount("user1234", "account1234")).thenReturn(List.of(transaction1, transaction2));

        mockMvc.perform(get("/api/transactions/account/account1234")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].transactionId").value(transaction1.getTransactionId()))
                .andExpect(jsonPath("$[0].userId").value(transaction1.getUserId()))
                .andExpect(jsonPath("$[0].accountId").value(transaction1.getAccountId()))
                .andExpect(jsonPath("$[0].amount").value(transaction1.getAmount()))
                .andExpect(jsonPath("$[0].type").value(transaction1.getType().name()))
                .andExpect(jsonPath("$[0].categoryId").value(transaction1.getCategoryId()))
                .andExpect(jsonPath("$[0].description").value(transaction1.getDescription()))
                .andExpect(jsonPath("$[1].transactionId").value(transaction2.getTransactionId()))
                .andExpect(jsonPath("$[1].userId").value(transaction2.getUserId()))
                .andExpect(jsonPath("$[1].accountId").value(transaction2.getAccountId()))
                .andExpect(jsonPath("$[1].amount").value(transaction2.getAmount()))
                .andExpect(jsonPath("$[1].type").value(transaction2.getType().name()))
                .andExpect(jsonPath("$[1].categoryId").value(transaction2.getCategoryId()))
                .andExpect(jsonPath("$[1].description").value(transaction2.getDescription()));
    }

    @WithMockUser(username = "user1234")
    @Test
    void getTransactionById() throws Exception {
        Transaction transaction1 = new Transaction();
        transaction1.setTransactionId("transaction1234");
        transaction1.setUserId("user1234");
        transaction1.setAccountId("account1234");
        transaction1.setAmount(500.0);
        transaction1.setType(TransactionType.INCOME);
        transaction1.setCategoryId("SAVINGS");
        transaction1.setDescription("Some description");

        when(transactionService.getTransactionById("user1234", transaction1.getAccountId(), transaction1.getTransactionId())).thenReturn(Optional.of(transaction1));

        mockMvc.perform(get("/api/transactions/account/account1234/transaction1234")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.transactionId").value(transaction1.getTransactionId()))
                .andExpect(jsonPath("$.userId").value(transaction1.getUserId()))
                .andExpect(jsonPath("$.accountId").value(transaction1.getAccountId()))
                .andExpect(jsonPath("$.amount").value(transaction1.getAmount()))
                .andExpect(jsonPath("$.type").value(transaction1.getType().name()))
                .andExpect(jsonPath("$.categoryId").value(transaction1.getCategoryId()))
                .andExpect(jsonPath("$.description").value(transaction1.getDescription()));

    }

    @WithMockUser(username = "user1234")
    @Test
    void createTransaction() throws Exception {
        TransactionDTO transactionDTO = new TransactionDTO();
        transactionDTO.setAmount(500.0);
        transactionDTO.setType(TransactionType.INCOME);
        transactionDTO.setCategoryId("SAVINGS");
        transactionDTO.setDescription("Some description");

        Transaction transaction = new Transaction();
        transaction.setTransactionId("transaction1234");
        transaction.setUserId("user1234");
        transaction.setAccountId("account1234");
        transaction.setAmount(transactionDTO.getAmount());
        transaction.setType(transactionDTO.getType());
        transaction.setCategoryId(transactionDTO.getCategoryId());
        transaction.setDescription(transactionDTO.getDescription());

        when(transactionService.createTransaction("user1234", transaction.getAccountId(), transactionDTO)).thenReturn(transaction);

        mockMvc.perform(post("/api/transactions/account/account1234")
                .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                    {
                                    "amount": 500,
                                    "type": "INCOME",
                                    "categoryId": "SAVINGS",
                                    "description": "Some description"
                                    }
                                    """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.transactionId").value(transaction.getTransactionId()))
                .andExpect(jsonPath("$.accountId").value(transaction.getAccountId()))
                .andExpect(jsonPath("$.amount").value(transactionDTO.getAmount()))
                .andExpect(jsonPath("$.type").value(transactionDTO.getType().name()))
                .andExpect(jsonPath("$.categoryId").value(transactionDTO.getCategoryId()))
                .andExpect(jsonPath("$.description").value(transactionDTO.getDescription()));

    }

    @WithMockUser(username = "user1234")
    @Test
    void deleteTransactionById() throws Exception {
        TransactionDTO transactionDTO = new TransactionDTO();
        transactionDTO.setAmount(500.0);
        transactionDTO.setType(TransactionType.EXPENSE);
        transactionDTO.setCategoryId("SAVINGS");
        transactionDTO.setDescription("Some description");

        Transaction transaction = new Transaction();
        transaction.setTransactionId("transaction1234");
        transaction.setUserId("user1234");
        transaction.setAccountId("account1234");
        transaction.setAmount(transactionDTO.getAmount());
        transaction.setType(transactionDTO.getType());
        transaction.setCategoryId(transactionDTO.getCategoryId());
        transaction.setDescription(transactionDTO.getDescription());

        when(transactionService.createTransaction("user1234", transaction.getAccountId(), transactionDTO)).thenReturn(transaction);

        when(transactionService.deleteTransactionById("user1234", transaction.getAccountId(), transaction.getTransactionId())).thenReturn(Boolean.TRUE);

        mockMvc.perform(delete("/api/transactions/account/account1234/transaction1234"))
                .andExpect(status().isOk());

        verify(transactionService).deleteTransactionById("user1234", transaction.getAccountId(), transaction.getTransactionId());
    }
}