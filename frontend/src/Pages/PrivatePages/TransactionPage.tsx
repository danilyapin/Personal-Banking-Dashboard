import {Alert, Box, CircularProgress, Container, Snackbar, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import TransactionList from "../../Components/Transactions/TransactionList.tsx";
import type {TransactionType} from "../../types/TransactionType.tsx";

type Transaction = {
    transactionId: string;
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
}

export default function TransactionPage(){

    const [accounts, setAccounts] = useState<Account[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success")

    useEffect(() => {
        const token = localStorage.getItem("token");
        setLoading(true);

        const fetchAccounts = axios.get("/api/accounts", { headers: { Authorization: `Bearer ${token}` } });
        const fetchTransactions = axios.get("/api/transactions", { headers: { Authorization: `Bearer ${token}` } });

        Promise.all([fetchAccounts, fetchTransactions])
            .then(([accRes, transRes]) => {
                setAccounts(accRes.data);
                setTransactions(transRes.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error loading data", error);
                setLoading(false);
                showSnackbar("Error loading data", "success");
            })

        axios.get(`/api/transactions`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                setTransactions(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log("Error fetching transactions", error);
                setLoading(false);
            })
    }, []);

    const showSnackbar = (message: string, severity: typeof snackbarSeverity = "success") => {
        setSnackbarMessage(message)
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    }

    if (loading) {
        return (
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height="50vh"
            >
                <CircularProgress sx={{ mb: 2 }} />
                <Typography color="text.secondary">
                    Loading transactions, please wait...
                </Typography>
            </Box>
        );
    }

    return(
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" mb={3} fontWeight={600}>
                My All Transactions
            </Typography>
            <TransactionList transactions={transactions} accounts={accounts}/>
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

    )
}