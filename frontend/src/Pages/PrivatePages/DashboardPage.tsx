import { useEffect, useState } from "react";
import {Container, Typography, Stack, Box, Button, Card, CardContent, CircularProgress} from "@mui/material";
import axios from "axios";
import {useNavigate} from "react-router-dom";

import SummaryCards from "../../Components/Dashboard/SummaryCards.tsx"
import ExpensesPieChart from "../../Components/Dashboard/ExpensesPirChart.tsx";
import IncomeExpenseLineChart from "../../Components/Dashboard/IncomeExpenseLineCharts.tsx";
import RecentTransactionsTable from "../../Components/Dashboard/RecentTransactionsTable.tsx"
import { useDashboardData } from "../../Components/Dashboard/useDashboardData.tsx"
import type {TransactionType} from "../../types/TransactionType.tsx";
import { API_URL } from "../../config.ts";

type Transaction = {
    transactionId: string;
    accountId: string;
    categoryId: string;
    amount: number;
    type: TransactionType;
    date: string;
    description: string;
};

type Category = {
    categoryId: string;
    name: string
};

type Account = {
    accountId: string;
    name: string;
    balance: number
};

type User = {
    userId: string;
    username: string
};

export default function DashboardPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setLoading(true);

        const fetchCategories = axios.get(`${API_URL}/api/categories`, { headers: { Authorization: `Bearer ${token}` } });
        const fetchTransactions = axios.get(`${API_URL}/api/transactions`, { headers: { Authorization: `Bearer ${token}` } });
        const fetchUser = axios.get(`${API_URL}/api/login/me`, { headers: { Authorization: `Bearer ${token}` } });
        const fetchAccounts = axios.get(`${API_URL}/api/accounts`, { headers: { Authorization: `Bearer ${token}` } });

        Promise.all([fetchCategories, fetchTransactions, fetchUser, fetchAccounts])
            .then(([catRes, transRes, userRes, accRes]) => {
                setCategories(catRes.data);
                setTransactions(transRes.data);
                setUser(userRes.data);
                setAccounts(accRes.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error loading dashboard data", error);
                setLoading(false);
            });
    }, []);

    const {
        totalIncome,
        totalExpense,
        totalBalance,
        netSavings,
        expensesByCategory,
        monthlyData
    } = useDashboardData(transactions, accounts, categories);

    const getAccountName = (accountId: string) => {
        const account = accounts.find((account) => account.accountId === accountId);
        return account ? account.name : "Unknown Account";
    }

    if (loading) {
        return (
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height="50vh"
            >
                <CircularProgress sx={{ mb: 2 }} />
                <Typography color="text.secondary">
                    Loading dashboard, please wait...
                </Typography>
            </Box>
        );
    }

    const hasNoData =
        categories.length === 0 && accounts.length === 0 && transactions.length === 0;

    if (hasNoData) {
        return (
            <Container sx={{ mt: 6, mb: 6 }}>
                <Stack alignItems="center">
                    <Typography variant="h4" fontWeight={600} mb={2}>
                        Welcome, {user ? user.username : "User"}!
                    </Typography>
                    <Typography variant="h6" color="text.secondary" mb={4}>
                        Let’s get your finance dashboard set up!
                    </Typography>

                    <Card
                        elevation={4}
                        sx={{
                            maxWidth: 600,
                            borderRadius: 3,
                            p: 2,
                            transition: "0.3s",
                            "&:hover": { boxShadow: 8 },
                        }}
                    >
                        <CardContent>
                            <Typography variant="body1" color="text.primary" mb={2}>
                                It looks like you don’t have any data yet. To get started:
                            </Typography>

                            <Box component="ul" sx={{ pl: 3, mb: 3 }}>
                                <Typography component="li" variant="body2" mb={1}>
                                    Create your <strong>first category</strong> (e.g., “Food”, “Salary”, “Rent”)
                                </Typography>
                                <Typography component="li" variant="body2" mb={1}>
                                    Then add one or more <strong>accounts</strong> (e.g., Checking, Savings)
                                </Typography>
                                <Typography component="li" variant="body2" mb={1}>
                                    Finally, record your <strong>first transaction</strong> to start tracking
                                    income and expenses
                                </Typography>
                            </Box>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                mb={3}
                                textAlign="center"
                            >
                                Once you’ve created these, your personalized dashboard with charts and
                                summaries will appear here automatically.
                            </Typography>

                            <Stack alignItems="center">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => navigate("/categories")}
                                >
                                    Create Your First Category
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Stack>
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 4 }}>
            {user && (
                <Typography variant="h4" mb={3} fontWeight={600}>
                    Welcome back, {user.username}!
                </Typography>
            )}
            <SummaryCards
                totalBalance={totalBalance}
                totalIncome={totalIncome}
                totalExpense={totalExpense}
                netSavings={netSavings}
            />
            <Stack direction={{ xs: "column", md: "row" }} spacing={3} mt={3}>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <ExpensesPieChart expensesByCategory={expensesByCategory} />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <IncomeExpenseLineChart monthlyData={monthlyData} />
                </Box>
            </Stack>
            <RecentTransactionsTable transactions={transactions} getAccountName={getAccountName} />
        </Container>
    );
}
