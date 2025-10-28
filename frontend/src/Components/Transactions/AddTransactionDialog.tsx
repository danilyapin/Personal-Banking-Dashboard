import {useState, type ChangeEvent, useEffect} from "react";
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
    MenuItem,}
    from "@mui/material";
import axios from "axios";
import type {TransactionType} from "../../types/TransactionType.tsx";

type AddTransactionDialogProps = {
    open: boolean;
    accountId: string;
    onClose: () => void;
    onAdd: (transaction: { transactionId: string; accountId:string; categoryId:string; amount:number; type: TransactionType; description:string }) => void;
}

export default function AddTransactionDialog({ open, accountId , onClose, onAdd }: AddTransactionDialogProps) {
    const [newTransaction, setNewTransaction] = useState({
        amount: "",
        type: "",
        category: "",
        description: "",});

    const [categories, setCategories] = useState<{ categoryId: string; name: string }[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTransaction({ ...newTransaction, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if(open) {
            const token = localStorage.getItem("token");
            axios.get("/api/categories", {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((response) => setCategories(response.data))
                .catch((error) => console.log("Error loading categories", error));
        }
    }, [open]);

    const handleSubmit = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(`/api/transactions/account/${accountId}`, {
                amount: newTransaction.amount,
                type: newTransaction.type,
                categoryId: newTransaction.category,
                description: newTransaction.description,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            onAdd(response.data);
            setNewTransaction({ amount: "", type: "", category: "", description: ""});
            onClose();
        } catch (error) {
            console.log("Error adding transaction", error);
        }
    }

    const isFormValid =
        newTransaction.amount.trim() !== "" &&
        newTransaction.type !== "" &&
        newTransaction.category.trim() !== "" &&
        newTransaction.description.trim() !== "";

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>
                Add New Transaction
            </DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Amount"
                    name="amount"
                    type="number"
                    fullWidth
                    required
                    value={newTransaction.amount}
                    onChange={handleChange}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel>Type</InputLabel>
                    <Select
                        value={newTransaction.type}
                        onChange={(e) =>
                            setNewTransaction({ ...newTransaction, type: e.target.value as TransactionType })}
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
                        <MenuItem value="EXPENSE">Expense</MenuItem>
                        <MenuItem value="INCOME">Income</MenuItem>
                    </Select>
                    </FormControl>
                    <FormControl fullWidth margin="dense">
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={newTransaction.category}
                        onChange={(e) =>
                            setNewTransaction({ ...newTransaction, category: e.target.value})}
                        label="Category"
                        renderValue={(selected) => {
                            if (!selected) return "Select type";
                            const category = categories.find((c) => c.categoryId === selected);
                            return category ? category.name : selected;
                        }}
                    >
                        <MenuItem value=""><em>Select Category</em></MenuItem>
                        {categories.map(category => (
                            <MenuItem key={category.categoryId} value={category.categoryId}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    margin="dense"
                    label="Description"
                    name="description"
                    type="text"
                    fullWidth
                    required
                    value={newTransaction.description}
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
        </Dialog>
    )
}
