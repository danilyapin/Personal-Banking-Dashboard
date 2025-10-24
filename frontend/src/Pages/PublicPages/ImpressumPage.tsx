import { Box, Typography, Link } from "@mui/material";

export default function ImprintPage() {
    return (
        <Box
            sx={{
                maxWidth: 700,
                mx: "auto",
                mt: 8,
                p: 4,
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 3,
            }}
        >
            <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">
                Imprint
            </Typography>

            <Typography variant="body1" mb={2}>
                <strong>Project Name:</strong> Personal-Banking-Dashboard
            </Typography>

            <Typography variant="body1" mb={2}>
                <strong>Developer / Owner:</strong> Daniel Lyapin
            </Typography>

            <Typography variant="body1" mb={2}>
                <strong>Address:</strong> Tempelhofer Str. 18, Langenhagen, 30853, Germany
            </Typography>

            <Typography variant="body1" mb={2}>
                <strong>Contact:</strong>{" "}
                <Link href="mailto:danilyapin17@gmail.com" underline="hover">
                    danilyapin17@gmail.com
                </Link>
            </Typography>

            <Typography variant="body1" mb={2}>
                <strong>Website:</strong>{" "}
                <Link href="https://github.com/danilyapin" target="_blank" rel="noopener" underline="hover">
                    https://github.com/danilyapin
                </Link>
            </Typography>

            <Typography variant="body1" mb={2}>
                This application is developed as a project for learning purposes and
                does not provide financial advice.
            </Typography>
        </Box>
    );
}
