import { Card, CardContent, Typography, Box } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";

type MonthlyData = {
    month: string;
    income: number;
    expense: number
};

type IncomeExpenseLineChartProps = {
    monthlyData: MonthlyData;
};

export default function IncomeExpenseLineChart({ monthlyData }: IncomeExpenseLineChartProps) {
    return (
        <Card sx={{ height: 450, p: 2, borderRadius: 3, transition: "0.3s", "&:hover": { boxShadow: 6 } }}>
            <CardContent sx={{ height: "100%" }}>
                <Typography variant="h6" mb={2}>Income vs Expenses Over Time</Typography>
                <Box sx={{ width: "100%", height: "100%" }}>
                    <ResponsiveContainer height={380} width="100%">
                        <LineChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis tickFormatter={(value) => `€${value}`} />
                            <Tooltip formatter={(value: number) => `€${value}`} />
                            <Legend />
                            <Line type="monotone" dataKey="income" stroke="#4caf50" name="Income" />
                            <Line type="monotone" dataKey="expense" stroke="#f44336" name="Expense" />
                        </LineChart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    );
}
