import { Box, Container, Typography, Paper, Stack } from "@mui/material";

const steps = [
    {title: "Create Your Accounts", description: "Navigate to the Accounts page and add new accounts with name, type, and balance."},
    {title: "Add Your Categories", description: "Go to Categories and create your own categories by typing the names you want. Name them according to your spending habits."},
    {title: "Record Transactions", description: "Add transactions, select the account and category, enter amount and description, and choose income or expense."},
    {title: "Analyze Your Finances", description: "Check the Dashboard for charts and summaries to track your spending and optimize your budget."},
];

const tips = [
    {title: "Be Consistent", description: "Regularly add transactions to keep your dashboard accurate."},
    {title: "Customize Categories", description: "Create categories that fit your personal spending habits."},
    {title: "Track Accounts", description: "Keep account balances updated for reliable insights."},
    {title: "Use Dashboard Insights", description: "Explore charts and summaries to identify trends and optimize spending."}
];

export default function GettingStartedPage() {
    return (
        <Container maxWidth="lg" sx={{ py: 3 }}>
            <Box textAlign="center" mb={10}>
                <Typography variant="h3" fontWeight={800} gutterBottom>
                    Getting Started
                </Typography>
                <Typography variant="h6" color="text.secondary" maxWidth="md" mx="auto">
                    Follow these simple steps to manage your finances efficiently and enjoy a smooth experience.
                </Typography>
            </Box>

            <Box mb={12}>
                <Typography
                    variant="h4"
                    component="h2"
                    fontWeight={600}
                    align="center"
                    gutterBottom
                >
                    Step-by-Step Guide
                </Typography>

                <Stack
                    direction="row"
                    flexWrap="wrap"
                    justifyContent="center"
                    gap={4}
                    mt={4}
                >
                    {steps.map((step) => (
                        <Paper
                            key={step.title}
                            elevation={3}
                            sx={{
                                p: 4,
                                width: { xs: '100%', sm: '45%', md: '30%' },
                                borderRadius: 3,
                                transition: '0.3s',
                                '&:hover': { boxShadow: 6 },
                            }}
                        >
                            <Typography variant="h6" fontWeight={700} gutterBottom>
                                {step.title}
                            </Typography>
                            <Typography color="text.secondary">{step.description}</Typography>
                        </Paper>
                    ))}
                </Stack>
            </Box>

            <Box>
                <Typography
                    variant="h4"
                    component="h2"
                    fontWeight={600}
                    align="center"
                    gutterBottom
                >
                    Tips for the Best Experience
                </Typography>

                <Stack
                    direction="row"
                    flexWrap="wrap"
                    justifyContent="center"
                    gap={4}
                    mt={4}
                >
                    {tips.map((tip) => (
                        <Paper
                            key={tip.title}
                            elevation={2}
                            sx={{
                                p: 4,
                                width: { xs: '100%', sm: '45%', md: '30%' },
                                borderRadius: 3,
                                backgroundColor: '#fafafa',
                                transition: '0.3s',
                                '&:hover': { boxShadow: 5 },
                            }}
                        >
                            <Typography variant="h6" fontWeight={700} gutterBottom>
                                {tip.title}
                            </Typography>
                            <Typography color="text.secondary">{tip.description}</Typography>
                        </Paper>
                    ))}
                </Stack>
            </Box>
        </Container>
    );
}
