import {
    Box,
    Divider,
    List,
    ListItemButton,
    ListItemText,
    Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

type Props = {
    token: string | null;
    onLogout: () => void;
    onClose: () => void;
};

export default function NavDrawerContent({ token, onLogout, onClose }: Props) {
    return (
        <Box sx={{ width: 250 }} role="presentation" onClick={onClose}>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" color="primary">
                    PBD
                </Typography>
            </Box>

            <Divider />

            <List>
                {token ? (
                    <>
                        <ListItemButton component={RouterLink} to="/dashboard">
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                        <ListItemButton component={RouterLink} to="/categories">
                            <ListItemText primary="Categories" />
                        </ListItemButton>
                        <ListItemButton component={RouterLink} to="/accounts">
                            <ListItemText primary="Accounts" />
                        </ListItemButton>
                        <ListItemButton component={RouterLink} to="/transactions">
                            <ListItemText primary="Transactions" />
                        </ListItemButton>
                        <Divider sx={{ my: 1 }} />
                        <ListItemButton onClick={onLogout}>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </>
                ) : (
                    <>
                        <ListItemButton component={RouterLink} to="/about-us">
                            <ListItemText primary="About us" />
                        </ListItemButton>
                        <ListItemButton component={RouterLink} to="/">
                            <ListItemText primary="Login" />
                        </ListItemButton>
                        <ListItemButton component={RouterLink} to="/register">
                            <ListItemText primary="Register" />
                        </ListItemButton>
                        <ListItemButton component={RouterLink} to="/impressum">
                            <ListItemText primary="Impressum" />
                        </ListItemButton>
                        <ListItemButton component={RouterLink} to="/getting-started">
                            <ListItemText primary="Getting Started" />
                        </ListItemButton>
                    </>
                )}
            </List>
        </Box>
    );
}
