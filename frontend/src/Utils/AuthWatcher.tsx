import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import isTokenExpired from "./isTokenExpired";
import {Alert, Snackbar} from "@mui/material";

export default function AuthWatcher() {

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success")

    const navigate = useNavigate();

    const showSnackbar = (message: string, severity: typeof snackbarSeverity = "success") => {
        setSnackbarMessage(message)
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const token = localStorage.getItem("token");
            if (!token || isTokenExpired(token)) {
                localStorage.removeItem("token");
                navigate("/", { replace: true });
                showSnackbar("You have been automatically logged out.", "success")
            }
        }, 30000);

        return () => clearInterval(interval);
    }, [navigate]);

    return (
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
            <Alert
                onClose={() => setSnackbarOpen(false)}
                severity={snackbarSeverity}
                sx={{ width: '100%', border: '1px solid', borderColor: 'grey.500'  }}
            >
                {snackbarMessage}
            </Alert>
        </Snackbar>
    );
}
