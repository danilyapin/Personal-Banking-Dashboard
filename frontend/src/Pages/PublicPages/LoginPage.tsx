import { useState } from "react";
import axios from "axios";
import {Box, TextField, Button, Typography, Stack, Alert, Link} from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("/api/login", {
                username,
                password,
            });

            const token = response.data;
            localStorage.setItem("token", token);

            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            setError("Error logging in");

            setTimeout(() => {
                setError("")
            }, 5000);
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 400,
                mx: "auto",
                mt: 10,
                p: 5,
                borderRadius: 3,
                boxShadow: 4,
                backgroundColor: "background.paper",
            }}
        >
            <Typography
                variant="h5"
                fontWeight={600}
                mb={3}
                textAlign="center"
                color="text.primary"
            >
                Login
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <form onSubmit={handleLogin}>
                <Stack spacing={2}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 1, py: 1.2, fontWeight: 600 }}
                    >
                        Login
                    </Button>
                </Stack>
            </form>
            <Box textAlign="center" mt={3}>
                <Typography variant="body2" color="text.secondary">
                    Not yet a user?{" "}
                    <Link
                        component={RouterLink}
                        to="/register"
                        underline="hover"
                        color="primary"
                        sx={{ fontWeight: 500 }}
                    >
                        Register now
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
}
