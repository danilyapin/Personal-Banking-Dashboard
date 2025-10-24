import {Box, CircularProgress, Container, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import TransactionList from "../../Components/Transactions/TransactionList.tsx";

type Transaction = {
    amount: number;
    type: string;
    category: string;
    description: string;
}

export default function TransactionPage(){

    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        setLoading(true);
        axios.get(`/api/transactions`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                setTransactions(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log("Error fetching transactions", error);
                setLoading(false);
            })
    }, []);

    if (loading) {
        return (
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height="50vh"
            >
                <CircularProgress sx={{ mb: 2 }} />
                <Typography color="text.secondary">
                    Loading transactions, please wait...
                </Typography>
            </Box>
        );
    }

    return(
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" mb={3} fontWeight={600}>
                My All Transactions
            </Typography>
            <TransactionList transactions={transactions} />
        </Container>
    )
}