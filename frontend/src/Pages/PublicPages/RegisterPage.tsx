import {useState} from "react";
import axios from "axios";
import {Box, TextField, Button, Typography, Stack, Alert, Link} from "@mui/material";
import {useNavigate, Link as RouterLink} from "react-router-dom";
import validator from "validator";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if(!validate()) return;

        if (password !== confirmPassword) {
            setError("Passwords do not match");

            setTimeout(() => {
                setError("");
            }, 4000)
            return;
        }

        try {
            await axios.post("/api/register", {
                username,
                password
            });

            setSuccess("Register successfully");
            setUsername("");
            setPassword("");
            setConfirmPassword("");

            setTimeout(() => navigate("/"), 2000);
        } catch (error) {
            console.log(error);
            setError("This username already exist");
        }
    }

    const validate = () => {
        let ok = true;

        setUsernameError("");
        setPasswordError("");
        setConfirmPasswordError("");
        setError("");

        if (username.trim().length < 3) {
            setUsernameError("Username must be at least 3 characters");
            ok = false;
        }

        const strongPassword = {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0
        }

        if(!validator.isStrongPassword(password, strongPassword)) {
            setPasswordError(
                "Password must be at least 8 characters and include uppercase, lowercase and a number"
            );
            ok = false
        }

        return ok;
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
                        error={!!usernameError}
                        helperText={usernameError}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                        error={!!passwordError}
                        helperText={passwordError}
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        fullWidth
                        error={!!confirmPasswordError}
                        helperText={confirmPasswordError}
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
                        component={RouterLink}
                        to="/"
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