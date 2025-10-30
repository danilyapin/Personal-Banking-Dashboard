import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Card,
    CardContent,
    Box,
    Stack,
    Typography, Button
} from "@mui/material";
import { useState} from "react";
import type {TransactionType} from "../../types/TransactionType.tsx";
import DeleteTransactionDialog from "./DeleteTransactionDialog.tsx";

type Transaction = {
    transactionId: string;
    accountId: string;
    categoryId: string;
    amount: number;
    type: TransactionType;
    date: string;
    description: string;
};

type TransactionListProps = {
    transactions: Transaction[];
    onDeleteTransaction: (transactionId: string) => void;
};

export default function TransactionListOfOneAccount({ transactions, onDeleteTransaction }: TransactionListProps) {
    const [filterType, setFilterType] = useState<TransactionType | "">("");
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

    const filteredTransactions =
        filterType === ""
            ? transactions
            : transactions.filter((transaction) => transaction.type === filterType);

    const displayTransactionType = (type: TransactionType) => {
        return type
            .toLowerCase()
            .replace(/_/g, " ")
            .replace(/\b\w/g, (t) => t.toUpperCase());
    }

    const handleOpenDeleteDialog = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setOpenDeleteDialog(true);
    }

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setSelectedTransaction(null);
    }

    return (
        <div>
            <FormControl fullWidth margin="normal">
                <InputLabel>Filter by Type</InputLabel>
                <Select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as TransactionType)}
                    label="Filter by Type"
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    <MenuItem value="INCOME">Income</MenuItem>
                    <MenuItem value="EXPENSE">Expense</MenuItem>
                </Select>
            </FormControl>
            {filteredTransactions.length === 0 ? (
                <Stack alignItems="center" mt={3}>
                    <Typography variant="h6" fontWeight={600}>
                        No transactions found.
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        textAlign="center"
                        mt={1}
                        maxWidth={500}
                    >
                        Transactions let you track your income and expenses. Example:
                        <strong>Amount:</strong> $50.00, <strong>Type:</strong> Expense, <strong>Category:</strong> Groceries, <strong>Description:</strong> Supermarket shopping.
                        Make sure you have already created categories, so you can assign each transaction correctly.
                        By adding transactions, you can see how your accounts are performing, understand your spending habits, and manage your finances effectively.
                    </Typography>
                </Stack>
            ) : (
                <Stack spacing={3} mt={2}>
                    {filteredTransactions.map((trans) => (
                        <Card
                            key={trans.transactionId}
                            elevation={3}
                            sx={{
                                p: 4,
                                borderRadius: 3,
                                transition: '0.3s',
                                '&:hover': { boxShadow: 6 },
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Box>
                                    <Typography variant="h6" fontWeight={500}>
                                        {trans.description}
                                    </Typography>
                                    <Typography>
                                        {displayTransactionType(trans.type)}
                                    </Typography>
                                </Box>
                                <Box textAlign="right">
                                    <Typography variant="h6" fontWeight={600}
                                                sx={{
                                                    color: trans.amount >= 0 ? "green" : "red"
                                                }}>
                                        {trans.amount >= 0 ? "+" : "-"}€ {Math.abs(trans.amount).toFixed(2)}
                                    </Typography>
                                    <Typography color="text.secondary" fontSize="0.9rem">
                                        {new Date(trans.date).toLocaleString("de-DE", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </Typography>
                                    <Stack direction="column" spacing={1} alignItems="flex-end" mt={1}>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            color="error"
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: 'white',
                                                    color: 'var(--error-color)',
                                                },
                                            }}
                                            onClick={() => {
                                                setSelectedTransaction(trans);
                                                setOpenDeleteDialog(true);
                                            }}
                                        >
                                            Delete transaction
                                        </Button>
                                    </Stack>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            )}
            {selectedTransaction && (
                <DeleteTransactionDialog
                    open={openDeleteDialog}
                    onClose={handleCloseDeleteDialog}
                    transaction={selectedTransaction}
                    onDelete={onDeleteTransaction}
                    />
            )}
        </div>
    );
}
