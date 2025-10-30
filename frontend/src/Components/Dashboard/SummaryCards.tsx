import { Grid, Card, CardContent, Typography } from "@mui/material";

type SummaryCardsProps = {
    totalBalance: number;
    totalIncome: number;
    totalExpense: number;
    netSavings: number;
};

export default function SummaryCards({ totalBalance, totalIncome, totalExpense, netSavings }: SummaryCardsProps) {
    const cards = [
        { label: "Total Balance", value: `€ ${totalBalance.toFixed(2)}`, color: "text.primary" },
        { label: "Total Income", value: `+€ ${totalIncome.toFixed(2)}`, color: "success.main" },
        { label: "Total Expenses", value: `-€ ${totalExpense.toFixed(2)}`, color: "error.main" },
        { label: "Net Savings", value: `${netSavings >= 0 ? "+" : "-"}€ ${Math.abs(netSavings).toFixed(2)}`, color: netSavings >= 0 ? "success.main" : "error.main" }
    ];

    return (
        <Grid
            container
            spacing={2}
        >
            {cards.map((card, idx) => (
                <Grid
                    key={idx}
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3
                }}
                >
                    <Card
                        sx={{
                            p: 2,
                            borderRadius: 3,
                            transition: '0.3s',
                            '&:hover': { boxShadow: 6 }
                        }}>
                        <CardContent>
                            <Typography variant="subtitle2" color="text.secondary">{card.label}</Typography>
                            <Typography variant="h5" color={card.color}>{card.value}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}
