import {useState, type ChangeEvent, useEffect} from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
    Snackbar,
}
    from "@mui/material";
import axios from "axios";
import {AccountType} from "../../types/AccountType.tsx";

type EditAccountProps = {
    open: boolean;
    onClose: () => void;
    onCloseConfirmDelete: () => void;
    account: { accountId: string; name: string; type: AccountType; balance: number }
    onUpdate: (account: { accountId: string; name: string; type: AccountType; balance: number }) => void;
    onDelete: (accountId: string) => void;
}

export default function EditAccountDialog({ open, onClose, onCloseConfirmDelete, account, onUpdate, onDelete }: EditAccountProps) {
    const [editedAccount, setEditedAccount] = useState(
        {
            name: "",
            type: "",
            balance: ""
        });

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

    useEffect(() => {
        if (account) {
            setEditedAccount({
                name: account.name,
                type: account.type,
                balance: account.balance.toString(),
            })
        }
    }, [account]);

    const handleDelete = async () => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`/api/accounts/${account.accountId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            onDelete(account.accountId)
            setSnackbarOpen(true);
            onClose()
        } catch (error) {
            console.error("Error deleting account", error);
        }

    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEditedAccount({ ...editedAccount, [e.target.name]: e.target.value });
    }

    const handleSubmit = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.put(`/api/accounts/${account.accountId}`, {
                name: editedAccount.name,
                type: editedAccount.type,
                balance: parseFloat(editedAccount.balance),
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            onUpdate(response.data);
            onClose();
        } catch (error) {
            console.log("Error updating account", error);
        }
    }

    const handleOpenConfirmDelete = () => {
        setConfirmDeleteOpen(true);
    }

    const handleCloseConfirmDelete = () => {
        setConfirmDeleteOpen(false);
    }

    const isFormValid =
       editedAccount.name.trim() !== "" &&
       editedAccount.type.toString().trim() !== "" &&
       editedAccount.balance.trim() !== "";

    return (
        <>
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Account</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Name"
                    name="name"
                    fullWidth
                    required
                    value={editedAccount.name}
                    onChange={handleChange}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel>Type</InputLabel>
                    <Select
                        value={editedAccount.type}
                        onChange={(e) =>
                            setEditedAccount({ ...editedAccount, type: e.target.value as AccountType })}
                        label="Type"
                    >
                        <MenuItem value={AccountType.CASH}>Cash</MenuItem>
                        <MenuItem value={AccountType.CHECKING}>Checking</MenuItem>
                        <MenuItem value={AccountType.SAVINGS}>Savings</MenuItem>
                        <MenuItem value={AccountType.CREDIT_CARD}>Credit Card</MenuItem>
                        <MenuItem value={AccountType.INVESTMENT}>Investment</MenuItem>
                        <MenuItem value={AccountType.OTHER}>Other</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    margin="dense"
                    label="Balance"
                    name="balance"
                    type="number"
                    fullWidth
                    value={editedAccount.balance}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleOpenConfirmDelete}
                    variant="contained"
                    color="error"
                    sx={{
                        '&:hover': {
                            backgroundColor: 'white',
                            color: 'var(--error-color)',
                        },
                    }}
                >
                    Delete account
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    disabled={!isFormValid}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
            {confirmDeleteOpen && (
            <Dialog open={confirmDeleteOpen} onClose={onCloseConfirmDelete}>
                <DialogTitle>Delete Account</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this account?
                    </Typography>
                    <Typography>
                        All associated transactions will be resolved revocably.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseConfirmDelete}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDelete}
                        variant="contained"
                        color="error"
                        sx={{
                            '&:hover': {
                                backgroundColor: 'white',
                                color: 'var(--error-color)',
                            },
                        }}
                    >
                        Delete account
                    </Button>
                </DialogActions>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => setSnackbarOpen(false)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                >
                    <Alert
                        onClose={() => setSnackbarOpen(false)}
                        severity="success"
                        sx={{ width: "100%" }}
                    >
                        Account deleted successfully!
                    </Alert>
                </Snackbar>
            </Dialog>
            )}
    </>
    )
}

