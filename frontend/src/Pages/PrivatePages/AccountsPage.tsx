import { useEffect, useState } from "react";
import axios from "axios";
import AddAccountDialog from "../../Components/Accounts/AddAccountDialog.tsx";
import EditAccountDialog from "../../Components/Accounts/EditAccountsDialog.tsx";
import AccountList from "../../Components/Accounts/AccountList.tsx";
import {
    Box,
    Typography,
    Button,
    CircularProgress,
    Container,
    Snackbar,
    Alert,
} from "@mui/material";
import type { AccountType }  from "../../types/AccountType.tsx";
import type {TransactionType} from "../../types/TransactionType.tsx";
import { API_URL } from "../../config";

type Account = {
    accountId: string;
    name: string;
    type: AccountType;
    balance: number;
};

type Transaction = {
    transactionId: string;
    accountId: string;
    type: TransactionType;
    amount: number;
    date: string;
    description: string;
};

export default function AccountsPage() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState<boolean>(false);
    const [editingAccount, setEditingAccount] = useState<Account | null>(null);
    const [editOpen, setEditOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success")

    useEffect(() => {
        const token = localStorage.getItem("token");
        setLoading(true);

        const fetchAccounts = axios.get(`${API_URL}/api/accounts`, { headers: { Authorization: `Bearer ${token}` } });
        const fetchTransactions = axios.get(`${API_URL}/api/transactions`, { headers: { Authorization: `Bearer ${token}` } });

        Promise.all([fetchAccounts, fetchTransactions])
            .then(([accRes, transRes]) => {
                setAccounts(accRes.data);
                setTransactions(transRes.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error loading data", error);
                setLoading(false);
                showSnackbar("Failed to load data", "error");
            });
    }, []);

    const handleUpdateAccount = (updated: Account) => {
        setAccounts((prev) =>
            prev.map((acc) => (acc.accountId === updated.accountId ? updated : acc))
        );
    };

    const handleDeleteAccount = (accountId: string) => {
        setAccounts((prev) => prev.filter((acc) => acc.accountId !== accountId));
        showSnackbar("Account deleted successfully", "success");
    };

    const handleEditOpen = (account: Account) => {
        setEditingAccount(account);
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditingAccount(null);
        setEditOpen(false);
    };

    const handleAddSuccess = (account: Account) => {
        setAccounts((prev) => [...prev, account]);
        showSnackbar("Account added successfully", "success");
    };

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
                    Loading accounts, please wait...
                </Typography>
            </Box>
        );
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" mb={3} fontWeight={600}>
                My Accounts
            </Typography>
            <AccountList accounts={accounts} transactions={transactions} onEdit={handleEditOpen} />
            <Box textAlign="center" mt={4}>
                <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                    Add New Account
                </Button>
            </Box>
            <AddAccountDialog open={open} onClose={() => setOpen(false)} onAdd={handleAddSuccess} />
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
            {editingAccount && (
                <EditAccountDialog
                    open={editOpen}
                    onClose={handleEditClose}
                    account={editingAccount}
                    onUpdate={handleUpdateAccount}
                    onDelete={handleDeleteAccount}
                    onCloseConfirmDelete={() => {}}
                />
            )}
        </Container>
    );
}
