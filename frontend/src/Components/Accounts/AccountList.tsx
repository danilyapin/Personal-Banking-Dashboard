import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Card,
    CardContent,
    Box,
    Stack,
    Typography,
    Button
} from "@mui/material";
import type { AccountType } from "../../types/AccountType.tsx";
import type { TransactionType } from "../../types/TransactionType.tsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

type AccountListProps = {
    accounts: Account[];
    transactions: Transaction[];
    onEdit: (account: Account) => void;
};

export default function AccountList({ accounts, transactions, onEdit }: AccountListProps) {
    const [filterType, setFilterType] = useState<AccountType | "">("");
    const navigate = useNavigate();

    const filteredAccounts =
        filterType === ""
            ? accounts
            : accounts.filter((account) => account.type === filterType);

    const displayAccountType = (type: AccountType) =>
        type
            .toLowerCase()
            .replace(/_/g, " ")
            .replace(/\b\w/g, (t) => t.toUpperCase());

    const goToTransactions = (accountId: string) => {
        navigate(`/accounts/${accountId}/transactions`);
    };

    return (
        <div>
            <FormControl fullWidth margin="normal">
                <InputLabel>Filter by Type</InputLabel>
                <Select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as AccountType)}
                    label="Filter by Type"
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    <MenuItem value="CASH">Cash</MenuItem>
                    <MenuItem value="CHECKING">Checking</MenuItem>
                    <MenuItem value="SAVINGS">Savings</MenuItem>
                    <MenuItem value="CREDIT_CARD">Credit Card</MenuItem>
                    <MenuItem value="INVESTMENT">Investment</MenuItem>
                    <MenuItem value="OTHER">Other</MenuItem>
                </Select>
            </FormControl>

            <Stack spacing={3} mt={2}>
                {filteredAccounts.length === 0 ? (
                    <Stack alignItems="center" mt={3}>
                        <Typography variant="h6" fontWeight={600}>
                            No accounts found.
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            textAlign="center"
                            mt={1}
                            maxWidth={500}
                        >
                            Accounts help you track your money. Example:
                            <strong>Name:</strong> Checking Account, <strong>Type:</strong> Checking, <strong>Balance:</strong> $1,200.00.
                            By creating an account, you can start adding transactions and see where your money goes.
                            Once accounts are set up, you can manage your budget and categorize each transaction easily.
                        </Typography>
                    </Stack>
                ) : (
                    filteredAccounts.map((acc) => {
                        const accTransactions = transactions.filter(t => t.accountId === acc.accountId);

                        const incomeSum = accTransactions
                            .filter(t => t.type === "INCOME")
                            .reduce((sum, t) => sum + t.amount, 0);

                        const expenseSum = accTransactions
                            .filter(t => t.type === "EXPENSE")
                            .reduce((sum, t) => sum + t.amount, 0);

                        const difference = incomeSum - expenseSum;
                        const currentBalance = acc.balance + difference;

                        return (
                            <Card key={acc.accountId} sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
                                <CardContent
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box>
                                        <Typography variant="h6" fontWeight={500}>{acc.name}</Typography>
                                        <Typography>{displayAccountType(acc.type)}</Typography>
                                    </Box>
                                    <Box textAlign="right">
                                        <Typography variant="h6" fontWeight={600}>
                                            ${currentBalance.toFixed(2)}
                                            {difference !== 0 && (
                                                <Typography
                                                    component="span"
                                                    sx={{ color: difference >= 0 ? "green" : "red", ml: 1 }}
                                                >
                                                    ({difference >= 0 ? "+" : "-"}${Math.abs(difference).toFixed(2)})
                                                </Typography>
                                            )}
                                        </Typography>
                                        <Stack direction="column" spacing={1} alignItems="flex-end" mt={1}>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                onClick={() => goToTransactions(acc.accountId)}
                                            >
                                                View Transactions
                                            </Button>
                                            <Button size="small" variant="outlined" onClick={() => onEdit(acc)}>
                                                Edit account
                                            </Button>
                                        </Stack>
                                    </Box>
                                </CardContent>
                            </Card>
                        );
                    })
                )}
            </Stack>
        </div>
    );
}
