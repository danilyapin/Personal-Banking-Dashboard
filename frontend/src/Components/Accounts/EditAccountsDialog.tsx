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
    MenuItem,}
from "@mui/material";
import axios from "axios";
import {AccountType} from "../../types/AccountType.tsx";

type Props = {
    open: boolean;
    onClose: () => void;
    onCloseConfirmDelete: () => void;
    account: { accountId: string; name: string; type: AccountType; balance: number }
    onUpdate: (account: { accountId: string; name: string; type: AccountType; balance: number }) => void;
    onDelete: (accountId: string) => void;
}

export default function EditAccountDialog({ open, onClose, onCloseConfirmDelete, account, onUpdate, onDelete }: Props) {
    const [editedAccount, setEditedAccount] = useState(
        {
            name: "",
            type: AccountType.CASH,
            balance: ""
        });

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
                <TextField margin="dense" label="Balance" name="balance" type="number" fullWidth required value={editedAccount.balance} onChange={handleChange} />
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
                >
                    Delete account
                </Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">Save</Button>
            </DialogActions>
        </Dialog>
            <Dialog open={confirmDeleteOpen} onClose={onCloseConfirmDelete}>
                <DialogTitle>Delete Account</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this account?
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
                    >
                        Delete account
                    </Button>
                </DialogActions>
            </Dialog>
    </>
    )
}

