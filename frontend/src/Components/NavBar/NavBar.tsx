import {Link as RouterLink, useNavigate} from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    Stack,
    Button,
    Link,
    useTheme,
    useMediaQuery,
    IconButton,
    Drawer, Alert, Snackbar
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {useState} from "react";
import NavDrawerContent from "./NavDrawerContent.tsx";

export default function NavBar() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setSnackBarOpen(true);
        setDrawerOpen(false);

        setTimeout(() => {
            navigate("/");
        }, 1500)
    }

    return (
        <AppBar
            position="static"
            color="default"
            elevation={1}
            sx={{borderBottom: 1, borderColor: "grey.300"}}
        >
            <Toolbar
                sx={{ px: 8, py: 2, justifyContent: "space-between" }}
            >
                <Typography
                    variant="h5"
                    component={RouterLink}
                    to="/dashboard"
                    sx={{
                        fontWeight: "bold",
                        color: "primary.main",
                        textDecoration: "none",
                        "&:hover": { color: "primary.dark" },
                    }}
                >
                    PBD
                </Typography>

                {isSmall ? (
                    <>
                        <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
                            <MenuIcon />
                        </IconButton>

                        <Drawer
                            anchor="left"
                            open={drawerOpen}
                            onClose={() => setDrawerOpen(false)}
                        >
                            <NavDrawerContent
                                token={token}
                                onLogout={handleLogout}
                                onClose={() => setDrawerOpen(false)}
                            />
                        </Drawer>
                    </>
                ): (
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
                                to="/accounts"
                                underline="hover"
                                color="text.primary"
                                sx={{ "&:hover": { color: "primary.main" } }}
                            >
                                Accounts
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
                                to="/transactions"
                                underline="hover"
                                color="text.primary"
                                sx={{ "&:hover": { color: "primary.main" } }}
                            >
                                Transactions
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
                )}
            </Toolbar>
            <Snackbar
                open={snackBarOpen}
                autoHideDuration={4000}
                onClose={() => setSnackBarOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <Alert onClose={() => setSnackBarOpen(false)} severity="success" sx={{ width: '100%', border: '1px solid', borderColor: 'grey.500'  }}>
                    Logout successful!
                </Alert>
            </Snackbar>
        </AppBar>
    );
}
