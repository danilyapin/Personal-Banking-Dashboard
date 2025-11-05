import { DataGrid, type GridRenderCellParams } from "@mui/x-data-grid";
import { Button, Stack, Typography } from "@mui/material";
import type { TransactionType } from "../../types/TransactionType.tsx";
import {useNavigate} from "react-router-dom";

type Transaction = {
    transactionId: string;
    accountId: string;
    categoryId: string;
    amount: number;
    type: TransactionType;
    date: string;
    description: string;
};

type Account = {
    accountId: string;
    name: string;
}

type TransactionListProps = {
    transactions: Transaction[];
    accounts: Account[];
};

export default function TransactionList({ transactions, accounts }: TransactionListProps) {
    const formatAmount = (amount: number, type: "INCOME" | "EXPENSE") =>
        `${type === "INCOME" ? "+" : ""}${amount.toFixed(2)} €`;

    const navigate = useNavigate();

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    };

    const columns = [
        {
            field: "accountName",
            headerName: "Account",
            flex: 1.5,
            renderCell: (params: GridRenderCellParams<Transaction>) => {
                const row = params.row as Transaction;
                return getAccountName(row.accountId);
            },
        },
        {
            field: "description",
            headerName: "Description",
            flex: 2
        },
        {
            field: "amount",
            headerName: "Amount",
            flex: 1,
            renderCell: (params: GridRenderCellParams<Transaction>) => {
                const row = params.row as Transaction;
                return formatAmount(row.amount, row.type);
            },
        },
        {
            field: "date",
            headerName: "Date",
            flex: 1.5,
            renderCell: (params: GridRenderCellParams<Transaction>) => {
                const row = params.row as Transaction;
                return formatDate(row.date);
            },
        },
    ];

    const getAccountName = (accountId: string) => {
        const account = accounts.find((account) => account.accountId === accountId);
        return account ? account.name : "Unknown Account";
    }

    const rows = transactions.map((t) => ({
        ...t,
        id: t.transactionId,
        accountName: getAccountName(t.accountId)
    }));

    const handleExport = () => {
        const header = columns.map((col) => col.headerName).join(";");
        const csvRows = rows.map((row) =>
            [row.accountName, row.description, formatAmount(row.amount, row.type), formatDate(row.date)].join(";")
        );
        const csvContent = [header, ...csvRows].join("\n");
        const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "transactions.csv");
        link.click();
    };

    if (rows.length === 0) {
        return (
            <Stack alignItems="center" mt={3} spacing={2}>
                <Typography variant="h6" fontWeight={600}>
                    No transactions found.
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center" maxWidth={450}>
                    Transactions help you track your income and expenses.
                    To start, you need to create an account first. Once an account is created, click "View Transactions"
                    to add your first transaction and manage your finances effectively.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/accounts")}
                >
                    Go to Accounts
                </Button>
            </Stack>
        );
    }

    return (
        <div style={{ height: 500, width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
                <Button
                    onClick={handleExport}
                    variant="contained"
                    color="primary"
                >
                    Export CSV
                </Button>
            </div>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[rows.length]}
                paginationModel={{ pageSize: rows.length, page: 0 }}
                sx={{
                    "& .MuiDataGrid-cell": {
                        userSelect: "none",
                    },
                }}
            />
        </div>
    );
}
