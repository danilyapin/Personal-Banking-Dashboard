import {useEffect, useState} from "react";
import { Box, Typography, Card, CardContent, Stack, Button } from "@mui/material";
import axios from "axios";

type Account = {
    name: string;
    type: string;
    balance: number;
}

export default function AccountsPage() {
    const [accounts, setAccounts] = useState<Account[]>([]);


    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token);
        if (!token) return;

        axios.get("/api/accounts", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                setAccounts(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log("Error fetching accounts", error);
            })
    }, []);

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" mb={4} fontWeight={600}>
                Your Accounts
            </Typography>

            <Stack spacing={3}>
                {accounts.map(account => (
                    <Card key={account.name} sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
                        <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Box>
                                <Typography variant="h6" fontWeight={500}>{account.name}</Typography>
                                <Typography color="text.secondary">{account.type}</Typography>
                            </Box>
                            <Box textAlign="right">
                                <Typography variant="h6" fontWeight={600}>${account.balance.toFixed(2)}</Typography>
                                <Button size="small" variant="outlined" sx={{ mt: 1 }}>
                                    View Transactions
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Stack>

            <Box textAlign="center" mt={4}>
                <Button variant="contained" color="primary">
                    Add New Account
                </Button>
            </Box>
        </Box>
    )
}