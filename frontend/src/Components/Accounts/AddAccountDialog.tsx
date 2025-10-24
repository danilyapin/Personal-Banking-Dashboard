import { useState, type ChangeEvent } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Snackbar,
    Alert}
    from "@mui/material";
import axios from "axios";
import {AccountType} from "../../types/AccountType.tsx";

type AddAccountDialogProps = {
    open: boolean;
    onClose: () => void;
    onAdd: (account: { accountId: string; name: string; type: AccountType; balance: number }) => void;
}

export default function AddAccountDialog({ open, onClose, onAdd }: AddAccountDialogProps) {
    const [newAccount, setNewAccount] = useState({
        name: "",
        type: "",
        balance: "" });

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewAccount({ ...newAccount, [e.target.name]: e.target.value });
    }

    const handleSubmit = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post("/api/accounts", {
                name: newAccount.name,
                type: newAccount.type,
                balance: parseFloat(newAccount.balance),
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            onAdd(response.data);
            setNewAccount({ name: "", type: "", balance: "" });
            setSnackbarOpen(true);
            onClose();
        } catch (error) {
            console.log("Error adding account", error);
        }
    }

    const isFormValid =
        newAccount.name.trim() !== "" &&
        newAccount.type.toString().trim() !== "" &&
        newAccount.balance.trim() !== "";


    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>
                Add New Account
            </DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Name"
                    name="name"
                    fullWidth
                    required
                    value={newAccount.name}
                    onChange={handleChange}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel>Type</InputLabel>
                    <Select
                        value={newAccount.type}
                        onChange={(e) =>
                            setNewAccount({ ...newAccount, type: e.target.value as AccountType })}
                        sx={{ width: '100%' }}
                        label="Type"
                        renderValue={(selected) => {
                            if (!selected) return "Select type";
                            return selected
                                .toLowerCase()
                                .split("_")
                                .map(word => word[0].toUpperCase() + word.slice(1))
                                .join(" ");
                        }}
                    >
                        <MenuItem value=""><em>Select Type</em></MenuItem>
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
                    required
                    value={newAccount.balance}
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
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    disabled={!isFormValid}
                >
                    Save
                </Button>
            </DialogActions>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="success">
                    Account added successfully!
                </Alert>
            </Snackbar>
        </Dialog>
    )
}
