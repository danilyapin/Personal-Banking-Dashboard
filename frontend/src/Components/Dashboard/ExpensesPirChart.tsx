import { Card, CardContent, Typography, Box } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function getColor(index: number, total: number) {
    const hue = (index * 360) / Math.max(total, 1);
    return `hsl(${hue}, 70%, 50%)`;
}

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
                                    <Cell key={index} fill={getColor(index, expensesByCategory.length)}  />
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
                                    backgroundColor: getColor(index, expensesByCategory.length),
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
