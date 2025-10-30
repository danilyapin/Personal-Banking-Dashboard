import { Card, CardContent, Typography, Box } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

type ExpenseData = {
    category: string;
    value: number
};

type ExpensesPieChartProps = {
    expensesByCategory: ExpenseData[];
};

export default function ExpensesPieChart({ expensesByCategory }: ExpensesPieChartProps) {

    return (
        <Card
            sx={{
                height: 450,
                p: 2,
                borderRadius: 3,
                transition: "0.3s",
                "&:hover": { boxShadow: 6 },
            }}
        >
            <CardContent sx={{ height: "100%" }}>
                <Typography variant="h6" mb={2}>
                    Expenses by Category
                </Typography>
                <Box sx={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={expensesByCategory}
                                dataKey="value"
                                nameKey="category"
                                outerRadius={120}
                                label={false}
                            >
                                {expensesByCategory.map((_, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => `€${value}`} />
                        </PieChart>
                    </ResponsiveContainer>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        mt: 2,
                    }}/**/
                >
                    {expensesByCategory.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mx: 1,
                                mb: 1,
                            }}
                        >
                            <Box
                                sx={{
                                    width: 16,
                                    height: 16,
                                    backgroundColor: COLORS[index % COLORS.length],
                                    borderRadius: "50%",
                                    mr: 0.5,
                                }}
                            />

                            <Typography variant="body2">
                                {item.category}: €{item.value}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
}
