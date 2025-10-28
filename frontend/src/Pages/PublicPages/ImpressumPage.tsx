import { Box, Typography, Link, Stack, Paper } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import HomeIcon from '@mui/icons-material/Home';

export default function ImprintPage() {
    return (
        <Box sx={{ py: 8, px: 2, minHeight: "80vh" }}>
            <Box maxWidth={800} mx="auto">
                <Typography
                    variant="h3"
                    fontWeight={800}
                    textAlign="center"
                    gutterBottom
                >
                    Imprint
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    textAlign="center"
                    mb={6}
                >
                    Legal and contact information for the Personal-Banking-Dashboard
                </Typography>

                <Stack spacing={4}>
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                        <Typography variant="h6" fontWeight={700} mb={2}>
                            Project Details
                        </Typography>
                        <Typography variant="body1" mb={1}>
                            <strong>Project Name:</strong> Personal-Banking-Dashboard
                        </Typography>
                        <Typography variant="body1" mb={1}>
                            <strong>Developer / Owner:</strong> Daniel Lyapin
                        </Typography>
                        <Typography variant="body1" display="flex" alignItems="center" gap={1}>
                            <HomeIcon fontSize="small" /> Tempelhofer Str. 18, Langenhagen, 30853, Germany
                        </Typography>
                    </Paper>

                    <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                        <Typography variant="h6" fontWeight={700} mb={2}>
                            Contact
                        </Typography>
                        <Stack spacing={1}>
                            <Typography variant="body1" display="flex" alignItems="center" gap={1}>
                                <EmailIcon fontSize="small" />
                                <Link href="mailto:danilyapin17@gmail.com" underline="hover">
                                    danilyapin17@gmail.com
                                </Link>
                            </Typography>
                            <Typography variant="body1" display="flex" alignItems="center" gap={1}>
                                <GitHubIcon fontSize="small" />
                                <Link href="https://github.com/danilyapin" target="_blank" rel="noopener" underline="hover">
                                    https://github.com/danilyapin
                                </Link>
                            </Typography>
                        </Stack>
                    </Paper>

                    <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                        <Typography variant="h6" fontWeight={700} mb={2}>
                            Disclaimer
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            This application is developed as a project for learning purposes and does not provide financial advice.
                        </Typography>
                    </Paper>
                </Stack>
            </Box>
        </Box>
    );
}
