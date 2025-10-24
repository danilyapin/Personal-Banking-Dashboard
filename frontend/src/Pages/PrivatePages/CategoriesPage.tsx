import {Box, Button, Card, CardContent, Container, Stack, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import AddCategoriesDialog from "../../Components/Categories/AddCategoriesDialog.tsx";
import EditCategoriesDialog from "../../Components/Categories/EditCategoriesDialog.tsx";

type Category = {
    categoryId: string;
    userId: string;
    name: string;
}

export default function CategoriesPage(){
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setLoading(true)

        axios.get("/api/categories", {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
            .then((response) => {
                setCategories(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log("Error fetching categories", error);
                setLoading(false);
            })

    }, [])

    const handleAddCategory = (category: Category) => {
        setCategories((prev) => [...prev, category]);
    }

        return (
            <Container sx={{ mt: 4 }}>
                <Typography variant="h4" mb={3} fontWeight={600}>
                    My Categories
                </Typography>
                {categories.length === 0 ? (
                    <Stack alignItems="center" mt={3}>
                        <Typography variant="h6" fontWeight={600}>
                            No categories found.
                        </Typography>
                    </Stack>
                ) : (
                    <Stack spacing={3} mt={2}>
                        {categories.map((cat) => (
                            <Card key={cat.categoryId} sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
                                <CardContent
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box>
                                        <Typography variant="h6" fontWeight={500}>
                                            {cat.name}
                                        </Typography>
                                    </Box>
                                    <Box textAlign="right">
                                        <Stack direction="column" spacing={1} alignItems="flex-end" mt={1}>
                                            <EditCategoriesDialog />
                                        </Stack>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>
                )}
                <Box textAlign="center" mt={4}>
                    <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                        Add New Category
                    </Button>
                </Box>
                <AddCategoriesDialog open={open} onClose={() => setOpen(false)} onAdd={handleAddCategory}/>
            </Container>
        )
}