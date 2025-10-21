import {useState} from "react";
import axios from "axios";
import {Box, TextField, Button, Typography, Stack, Alert, Link} from "@mui/material";
import {useNavigate} from "react-router-dom";


export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await axios.post("/api/register", {
                username,
                password
            });

            setSuccess("Register successfully");
            setUsername("");
            setPassword("");

            setTimeout(() => navigate("/"), 2000);
        } catch (error) {
            console.log(error);
            setError("This username already exist");
        }
    }


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
                Register
            </Typography>

            {error &&
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>}

            {success &&
                <Alert severity="success" sx={{ mb: 2 }}>
                    {success}
                </Alert>}

            <form onSubmit={handleRegister}>
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
                        Register
                    </Button>
                </Stack>
            </form>
            <Box textAlign="center" mt={3}>
                <Typography variant="body2" color="text.secondary">
                    Already a user?{" "}
                    <Link
                        href="/"
                        underline="hover"
                        color="primary"
                        sx={{ fontWeight: 500 }}
                    >
                        Log in now
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
}