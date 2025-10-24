import {Alert, Box, Button, Container, Snackbar, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import AddTransactionDialog from "../../Components/Transactions/AddTransactionDialog.tsx";
import TransactionListOfOneAccount from "../../Components/Transactions/TransactionListOfOneAccount.tsx";
import {TransactionType} from "../../types/TransactionType.tsx";

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

export default function TransactionPageOfOneAccount(){

    const { accountId } = useParams();
    const [open, setOpen] = useState<boolean>(false);
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success")

    useEffect(() => {
        const token = localStorage.getItem("token");

        setLoading(true);
        axios.get(`/api/transactions/account/${accountId}`, {
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
                showSnackbar("Error fetching transactions", error);
            })
    }, [accountId]);

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

    return(
        <>
            <Container sx={{ mt: 4 }}>
                <Typography variant="h4" mb={3} fontWeight={600}>
                    My Transactions
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