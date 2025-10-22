import { useEffect, useState} from "react";
import axios from "axios";
import AddAccountDialog from "../../Components/Accounts/AddAccountDialog.tsx";
import EditAccountDialog from "../../Components/Accounts/EditAccountsDialog.tsx";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Stack,
    Button,
    CircularProgress, Container
} from "@mui/material";
import {AccountType} from "../../types/AccountType.tsx";

type Account = {
    accountId: string;
    name: string;
    type: AccountType;
    balance: number;
}

export default function AccountsPage() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState<boolean>(false);

    const [editingAccount, setEditingAccount] = useState<Account | null>(null);
    const [editOpen, setEditOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        setLoading(true);
        axios.get("/api/accounts", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                setAccounts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log("Error fetching accounts", error);
                setLoading(false);
            })
    }, []);


    const handleAddAccount = (account: Account) => {
        setAccounts([...accounts, account]);
    }

    const handleUpdateAccount = (updateAccount: Account) => {
        setAccounts(accounts.map(account => account.accountId === updateAccount.accountId ? updateAccount : account));
    }

    const handleEditOpen = (account: Account) => {
        setEditingAccount(account);
        setEditOpen(true);
    }

    const handleCloseConfirmDelete = () => {
    }

    const handleDeleteAccount = (accountId: string) => {
        setAccounts(accounts.filter(account => account.accountId !== accountId));
    }

    const handleEditClose = () => {
        setEditingAccount(null);
        setEditOpen(false);
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
                <CircularProgress role="status" sx={{ mb: 2 }} />
                <Typography variant="body1" color="textSecondary">Loading accounts, please wait...</Typography>
            </Box>
        );
    }

    return (
        <Container sx={{ mt:4 }}>
            <Typography variant="h4" mb={3} fontWeight={600}>
                My Accounts
            </Typography>
            {accounts.length === 0 ? (
                <Stack alignItems="center">
                    <Typography variant="h6" fontWeight={600}>
                        You don’t have any accounts yet.
                    </Typography>
                </Stack>
            ) : (
                <Stack spacing={3}>
                {accounts.map(account => (
                    <Card key={account.name} sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
                        <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Box>
                                <Typography variant="h6" fontWeight={500}>{account.name}</Typography>
                                <Typography color="text.secondary">{account.type}</Typography>
                            </Box>
                            <Box textAlign="right">
                                <Typography variant="h6" fontWeight={600}>${account.balance.toFixed(2)}</Typography>
                                <Stack direction="column" spacing={1} alignItems="flex-end" mt={1}>
                                    <Button size="small" variant="outlined">
                                        View Transactions
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        onClick={() => handleEditOpen(account)}
                                    >
                                        Edit account
                                    </Button>
                                </Stack>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
            )}
            <Box textAlign="center" mt={4}>
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    Add New Account
                </Button>
            </Box>
            <AddAccountDialog open={open} onClose={handleClose} onAdd={handleAddAccount} />
                {editingAccount && (
                    <EditAccountDialog
                        open={editOpen}
                        onClose={handleEditClose}
                        onCloseConfirmDelete={handleCloseConfirmDelete}
                        account={editingAccount}
                        onUpdate={handleUpdateAccount}
                        onDelete={handleDeleteAccount}
                    />
                )}
        </Container>
    )
}