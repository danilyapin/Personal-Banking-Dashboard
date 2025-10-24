import {Box, Card, CardContent, FormControl, InputLabel, MenuItem, Select, Stack, Typography} from "@mui/material";
import {useState} from "react";
import {TransactionType} from "../../types/TransactionType.tsx";

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
};

export default function TransactionList({ transactions }: TransactionListProps) {
    const [filterType, setFilterType] = useState<TransactionType | "">("");

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
                    <MenuItem value={TransactionType.INCOME}>Income</MenuItem>
                    <MenuItem value={TransactionType.EXPENSE}>Expense</MenuItem>
                </Select>
            </FormControl>
            {filteredTransactions.length === 0 ? (
                <Stack alignItems="center" mt={3}>
                    <Typography variant="h6" fontWeight={600}>
                        No transactions found.
                    </Typography>
                </Stack>
            ) : (
                <Stack spacing={3} mt={2}>
                    {filteredTransactions.map((trans) => (
                        <Card key={trans.transactionId} sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
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
                                        color: trans.type === TransactionType.INCOME ? "green" : "red"
                                    }}>
                                        {trans.type === TransactionType.INCOME ? "+" : "-"}
                                        ${trans.amount.toFixed(2)}
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
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            )}
        </div>
    );
}
