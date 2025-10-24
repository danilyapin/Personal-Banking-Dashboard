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
import { AccountType } from "../../types/AccountType.tsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Account = {
    accountId: string;
    name: string;
    type: AccountType;
    balance: number;
};

type AccountListProps = {
    accounts: Account[];
    onEdit: (account: Account) => void;
};

export default function AccountList({ accounts, onEdit }: AccountListProps) {
    const [filterType, setFilterType] = useState<AccountType | "">("");

    const navigate = useNavigate();

    const filteredAccounts =
        filterType === ""
            ? accounts
            : accounts.filter((account) => account.type === filterType);

    const displayAccountType = (type: AccountType) => {
        return type
            .toLowerCase()
            .replace(/_/g, " ")
            .replace(/\b\w/g, (t) => t.toUpperCase());
    }

    const goToTransactions = (accountId: string) => {
        navigate(`/accounts/${accountId}/transactions`)
    }

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
                    <MenuItem value={AccountType.CASH}>Cash</MenuItem>
                    <MenuItem value={AccountType.CHECKING}>Checking</MenuItem>
                    <MenuItem value={AccountType.SAVINGS}>Savings</MenuItem>
                    <MenuItem value={AccountType.CREDIT_CARD}>Credit Card</MenuItem>
                    <MenuItem value={AccountType.INVESTMENT}>Investment</MenuItem>
                    <MenuItem value={AccountType.OTHER}>Other</MenuItem>
                </Select>
            </FormControl>
            {filteredAccounts.length === 0 ? (
                <Stack alignItems="center" mt={3}>
                    <Typography variant="h6" fontWeight={600}>
                        No accounts found.
                    </Typography>
                </Stack>
            ) : (
                <Stack spacing={3} mt={2}>
                    {filteredAccounts.map((acc) => (
                        <Card key={acc.accountId} sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
                            <CardContent
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Box>
                                    <Typography variant="h6" fontWeight={500}>
                                        {acc.name}
                                    </Typography>
                                    <Typography>
                                        {displayAccountType(acc.type)}
                                    </Typography>
                                </Box>
                                <Box textAlign="right">
                                    <Typography variant="h6" fontWeight={600}>
                                        ${acc.balance.toFixed(2)}
                                    </Typography>
                                    <Stack direction="column" spacing={1} alignItems="flex-end" mt={1}>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={() => goToTransactions(acc.accountId)}
                                        >
                                            View Transactions
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={() => onEdit(acc)}
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
        </div>
    );
}
