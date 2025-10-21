import {Box, Typography, Paper, Container, Stack} from '@mui/material';

export default function AboutUsPage() {
    const features = [
        { title: 'Account Management', description: 'Keep track of all your accounts – bank, savings, or digital wallets.' },
        { title: 'Transactions', description: 'Quickly add and view income and expenses. Filter by category, date, or account.' },
        { title: 'Categories and Budgets', description: 'Organize your spending and monitor your budget in real-time.' },
        { title: 'Charts and Statistics', description: 'Visualize your finances with clear diagrams and dashboards.' },
        { title: 'Secure and Personal', description: 'All your data is safely stored, and your account is protected with modern authentication.' },
    ];

    const benefits = [
        { title: 'Simple and Intuitive', description: 'Complex financial data is displayed clearly and understandably.' },
        { title: 'All-in-One', description: 'Manage accounts, transactions, and reports in one place – no more paper chaos.' },
        { title: 'Responsive Design', description: 'Access your finances from any device, whether mobile, tablet, or desktop.' },
        { title: 'Easy Data Analysis', description: 'Dashboards and charts show you exactly where your money goes.' },
        { title: 'Future-Proof and Flexible', description: 'Our app grows with your needs, from everyday expenses to advanced finance tracking.' },
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 3 }}>
            <Box textAlign="center" mb={10}>
                <Typography variant="h3" fontWeight={800} gutterBottom>
                    About Our App
                </Typography>
                <Typography variant="h6" color="text.secondary" maxWidth="md" mx="auto">
                    Your personal finance management made simple, secure, and intuitive.
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
                    Features at a Glance
                </Typography>

                <Stack
                    direction="row"
                    flexWrap="wrap"
                    justifyContent="center"
                    gap={4}
                    mt={4}
                >
                    {features.map((feature) => (
                        <Paper
                            key={feature.title}
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
                                {feature.title}
                            </Typography>
                            <Typography color="text.secondary">{feature.description}</Typography>
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
                    Why Choose Our App?
                </Typography>

                <Stack
                    direction="row"
                    flexWrap="wrap"
                    justifyContent="center"
                    gap={4}
                    mt={4}
                >
                    {benefits.map((benefit) => (
                        <Paper
                            key={benefit.title}
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
                                {benefit.title}
                            </Typography>
                            <Typography color="text.secondary">{benefit.description}</Typography>
                        </Paper>
                    ))}
                </Stack>
            </Box>
        </Container>
    );
}
