import { Box, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "grey.100",
                color: "grey.700",
                mt: 4,
                py: 3,
                borderTop: 1,
                borderColor: "grey.300",
                px: 2,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 3,
                    mb: 1,
                    flexWrap: "wrap",
                    fontWeight: 500,
                }}
            >
                <Link
                    component={RouterLink}
                    to="/impressum"
                    underline="hover"
                    color="inherit"
                    sx={{ cursor: "pointer" }}
                >
                    Impressum
                </Link>
                <Link
                    component={RouterLink}
                    to="/about-us"
                    underline="hover"
                    color="inherit"
                    sx={{ cursor: "pointer" }}
                >
                    About Us
                </Link>
                <Link
                    component={RouterLink}
                    to="/getting-started"
                    underline="hover"
                    color="inherit"
                    sx={{ cursor: "pointer" }}
                >
                    Getting Started
                </Link>
            </Box>

            <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
                sx={{ userSelect: "none" }}
            >
                © {new Date().getFullYear()} DL. All rights reserved.
            </Typography>
        </Box>
    );
}
