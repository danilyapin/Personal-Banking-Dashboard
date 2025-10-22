import { Box, Typography } from "@mui/material";

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{ backgroundColor: "grey.100", color: "grey.700", mt: 4, py: 4, borderTop: 1, borderColor: "grey.300" }}
        >
                <Typography variant="body2" color="text.secondary" textAlign={{ xs: "center" }}>
                    © {new Date().getFullYear()} DL. All rights reserved.
                </Typography>
        </Box>
    );
}
