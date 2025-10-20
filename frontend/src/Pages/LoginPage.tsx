import { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography, Stack, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("/api/login", {
                username,
                password
            });

            const token = response.data.token;

            localStorage.setItem("token", token);

            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            setError("Error logging in");
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 400,
                mx: "auto",
                mt: 8,
                p: 4,
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: "background.paper",
            }}
        >
            <Typography variant="h5" mb={3} textAlign="center">
                Login Page
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

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
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Login
                    </Button>
                </Stack>
            </form>
        </Box>
    );
}
