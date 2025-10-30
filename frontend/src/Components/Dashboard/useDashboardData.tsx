import { useMemo } from "react";
import type { TransactionType } from "../../types/TransactionType.tsx";

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
    balance: number;
};

type Category = {
    categoryId: string;
    name: string;
};

export function useDashboardData(transactions: Transaction[], accounts: Account[], categories: Category[]) {

    return useMemo(() => {

        const totalIncome = transactions
            .filter(t => t.type === "INCOME")
            .reduce((sum, t) => sum + t.amount, 0);

        const totalExpense = transactions
            .filter(t => t.type === "EXPENSE")
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);

        const totalBalance = accounts.reduce((sum, acc) => {
            const accTransactions = transactions.filter(t => t.accountId === acc.accountId);
            const incomeSum = accTransactions
                .filter(t => t.type === "INCOME")
                .reduce((s, t) => s + t.amount, 0);
            const expenseSum = accTransactions
                .filter(t => t.type === "EXPENSE")
                .reduce((s, t) => s + Math.abs(t.amount), 0);
            const currentBalance = acc.balance + incomeSum - expenseSum;
            return currentBalance + sum;
        }, 0);

        const netSavings = totalIncome - totalExpense;


        const expensesByCategory = categories
            .map(cat => {
                const total = transactions
                    .filter(t => t.type === "EXPENSE" && t.categoryId === cat.categoryId)
                    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
                return { category: cat.name, value: total };
            })
            .filter(d => d.value > 0);

        const monthlyDataMap: Record<string, { income: number; expense: number }> = {};
        transactions.forEach(t => {
            const date = new Date(t.date);
            const monthKey = `${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`;
            if (!monthlyDataMap[monthKey]) monthlyDataMap[monthKey] = { income: 0, expense: 0 };
            if (t.type === "INCOME") monthlyDataMap[monthKey].income += t.amount;
            else monthlyDataMap[monthKey].expense += t.amount;
        });
        const monthlyData = Object.entries(monthlyDataMap)
            .map(([month, data]) => ({ month, ...data }))
            .sort((a, b) => a.month.localeCompare(b.month));

        return { totalIncome, totalExpense, totalBalance, netSavings, expensesByCategory, monthlyData };
    }, [transactions, accounts, categories]);
}
