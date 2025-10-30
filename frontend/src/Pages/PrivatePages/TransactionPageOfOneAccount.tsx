import {Alert, Box, Button, Container, Snackbar, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import AddTransactionDialog from "../../Components/Transactions/AddTransactionDialog.tsx";
import TransactionListOfOneAccount from "../../Components/Transactions/TransactionListOfOneAccount.tsx";
import type {TransactionType} from "../../types/TransactionType.tsx";
import type {AccountType} from "../../types/AccountType.tsx";

type Transaction = {
    transactionId: string;
    userId: string;
    accountId: string;
    categoryId: string;
    amount: number;
    type: TransactionType;
    date: string;
    description: string;
}

type Account = {
    accountId: string;
    name: string;
    type: AccountType;
    balance: number;
};

export default function TransactionPageOfOneAccount(){

    const { accountId } = useParams();
    const [open, setOpen] = useState<boolean>(false);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success")

    useEffect(() => {
        const token = localStorage.getItem("token");
        setLoading(true);

        const fetchAccounts = axios.get(`/api/accounts`, { headers: { Authorization: `Bearer ${token}` } });
        const fetchTransactions = axios.get(`/api/transactions/account/${accountId}`, { headers: { Authorization: `Bearer ${token}` } });

        Promise.all([fetchAccounts, fetchTransactions])
            .then(([accRes, transRes]) => {
                setAccounts(accRes.data);
                setTransactions(transRes.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log("Error loading data", error);
                setLoading(false);
                showSnackbar("Failed to load data", error.message);
            })
    }, []);

    const handleAddTransaction = (transaction: Transaction) => {
        setTransactions((prev) => [...prev, transaction]);
        showSnackbar("Transaction added successfully.", "success");
    };

    const handleDeleteTransaction = (transactionId: string) => {
        setTransactions((prev) => prev.filter(transaction => transaction.transactionId !== transactionId));
        showSnackbar("Transaction deleted successfully.", "success");
    }

    const showSnackbar = (message: string, severity: typeof snackbarSeverity = "success") => {
        setSnackbarMessage(message)
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    }

    const currentAccount = accounts.find(account => account.accountId === accountId);

    return(
        <>
            <Container sx={{ mt: 4 }}>
                <Typography variant="h4" mb={3} fontWeight={600}>
                    My Transactions
                    {currentAccount && ` - ${currentAccount.name}`}
                </Typography>
                <TransactionListOfOneAccount
                    transactions={transactions}
                    onDeleteTransaction={handleDeleteTransaction}/>
                <Box textAlign="center" mt={4}>
                    <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                        Add New Transaction
                    </Button>
                </Box>
                <AddTransactionDialog
                    open={open}
                    accountId={accountId}
                    onClose={() => setOpen(false)}
                    onAdd={handleAddTransaction} />
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => setSnackbarOpen(false)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                >
                    <Alert
                        onClose={() => setSnackbarOpen(false)}
                        severity={snackbarSeverity}
                        sx={{ width: '100%', border: '1px solid', borderColor: 'grey.500'  }}
                    >
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Container>
        </>
    )

}