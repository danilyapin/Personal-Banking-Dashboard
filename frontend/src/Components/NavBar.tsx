import {Link as RouterLink, useNavigate} from "react-router-dom";
import { AppBar, Toolbar, Typography, Stack, Button, Link } from "@mui/material";

export default function NavBar() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <AppBar position="static" color="default" elevation={1} sx={{borderBottom: 1, borderColor: "grey.300"}}>
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
                    {token ? (
                        <>
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
                                to="/accounts"
                                underline="hover"
                                color="text.primary"
                                sx={{ "&:hover": { color: "primary.main" } }}
                            >
                                Accounts
                            </Link>
                            <Button
                            onClick={handleLogout}
                            color="primary"
                            variant="contained"
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link
                                component={RouterLink}
                                to="/about-us"
                                underline="hover"
                                color="text.primary"
                                sx={{ "&:hover": { color: "primary.main" } }}
                            >
                                About us
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
                        </>
                    )}
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
