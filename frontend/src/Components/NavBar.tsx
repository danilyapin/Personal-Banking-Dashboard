import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Stack, Button, Link } from "@mui/material";

export default function NavBar() {
    return (
        <AppBar position="static" color="default" elevation={1}>
            <Toolbar sx={{ px: 8, py: 2, justifyContent: "space-between" }}>
                <Typography
                    variant="h5"
                    component={RouterLink}
                    to="/"
                    sx={{
                        fontWeight: "bold",
                        color: "primary.main",
                        textDecoration: "none",
                        "&:hover": { color: "primary.dark" },
                    }}
                >
                    PBD
                </Typography>

                <Stack direction="row" spacing={4} alignItems="center">
                    <Link
                        component={RouterLink}
                        to="/dashboard"
                        underline="hover"
                        color="text.primary"
                        sx={{ "&:hover": { color: "primary.main" } }}
                    >
                        Dashboard
                    </Link>
                    <Link
                        component={RouterLink}
                        to="/transactions"
                        underline="hover"
                        color="text.primary"
                        sx={{ "&:hover": { color: "primary.main" } }}
                    >
                        Transactions
                    </Link>
                    <Link
                        component={RouterLink}
                        to="/categories"
                        underline="hover"
                        color="text.primary"
                        sx={{ "&:hover": { color: "primary.main" } }}
                    >
                        Categories
                    </Link>
                    <Link
                        component={RouterLink}
                        to="/"
                        underline="hover"
                        color="text.primary"
                        sx={{ "&:hover": { color: "primary.main" } }}
                    >
                        Login
                    </Link>

                    <Button
                        component={RouterLink}
                        to="/register"
                        variant="contained"
                        color="primary"
                    >
                        Register
                    </Button>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
