import axios from "axios";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from "@mui/material";
import type {TransactionType} from "../../types/TransactionType.tsx";
import { API_URL} from "../../config.ts";


type DeleteTransactionDialogProps = {
    open: boolean;
    onClose: () => void;
    transaction: {transactionId: string, accountId: string; categoryId: string; amount: number; type: TransactionType; date: string; description: string};
    onDelete: (id: string) => void;
}

export default function DeleteTransactionDialog({onClose, transaction, onDelete, open}: DeleteTransactionDialogProps) {

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${API_URL}/api/transactions/account/${transaction.accountId}/${transaction.transactionId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            onDelete(transaction.transactionId);
            onClose();
        } catch (error) {
            console.log("Error deleting transaction", error);
        }
    }

    return (
                <Dialog open={open} onClose={onClose}>
                    <DialogTitle>Delete Transaction</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Are you sure you want to delete this transaction?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={onClose}
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
                </Dialog>
    )
}