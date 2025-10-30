import { Card, CardContent, Typography, Box } from "@mui/material";
import type {TransactionType} from "../../types/TransactionType.tsx";

type Transaction = {
    transactionId: string;
    userId: string;
    accountId: string;
    categoryId: string;
    type: TransactionType;
    amount: number;
    date: number;
    description: string;
}

type RecentTransactionsTableProps = {
    transactions: Transaction[];
    getAccountName: (accountId: string) => string;
};

export default function RecentTransactionsTable({ transactions, getAccountName }: RecentTransactionsTableProps) {
    return (
        <Card sx={{ p: 2, borderRadius: 3, transition: "0.3s", "&:hover": { boxShadow: 6 }, mt: 3 }}>
            <CardContent>
                <Typography variant="h6" mb={2}>Recent Transactions</Typography>
                <Box sx={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                        <tr style={{ textAlign: "left", borderBottom: "2px solid #ddd" }}>
                            <th style={{ padding: "8px" }}>Account</th>
                            <th style={{ padding: "8px" }}>Description</th>
                            <th style={{ padding: "8px" }}>Amount</th>
                            <th style={{ padding: "8px" }}>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {transactions && transactions.length > 0 ? (
                            transactions.map(t => (
                                    <tr
                                        key={t.transactionId}
                                        style={{ borderBottom: "1px solid #eee", transition: "background-color 0.2s", cursor: "default" }}
                                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
                                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                                    >
                                        <td style={{ padding: "8px" }}>{getAccountName(t.accountId)}</td>
                                        <td style={{ padding: "8px" }}>{t.description}</td>
                                        <td style={{ padding: "8px", color: t.type === "INCOME" ? "green" : "red" }}>
                                            {t.type === "INCOME" ? "€+" : "€" }{t.amount.toFixed(2)}
                                        </td>
                                        <td style={{ padding: "8px" }}>
                                            {new Date(t.date).toLocaleString("de-DE", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: false
                                            })}
                                        </td>
                                    </tr>
                                ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={4}
                                    style={{
                                        textAlign: "center",
                                        padding: "16px",
                                        color: "#888",
                                        fontStyle: "italic",
                                    }}
                                >
                                    No transactions found yet.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </Box>
            </CardContent>
        </Card>
    );
}
