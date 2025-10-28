import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Snackbar,
    Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import AddCategoriesDialog from "../../Components/Categories/AddCategoriesDialog.tsx";
import EditCategoriesDialog from "../../Components/Categories/EditCategoriesDialog.tsx";
import CategoriesList from "../../Components/Categories/CategoriesList.tsx";

type Category = {
    categoryId: string;
    userId: string;
    name: string;
}

export default function CategoriesPage(){
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [open, setOpen] = useState<boolean>(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success")

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
                showSnackbar("Error fetching categories", "error");
            })

    }, [])

    const handleAddCategory = (category: Category) => {
        setCategories((prev) => [...prev, category]);
        showSnackbar("Category added successfully", "success");
    }

    const handleUpdateCategory = (updated: Category) => {
        setCategories((prev) =>
            prev.map((category) => category.categoryId === updated.categoryId ? updated : category));
        showSnackbar("Category updated successfully", "success");
    }

    const handleDeleteCategory = (categoryId: string) => {
        setCategories((prev) =>
            prev.filter(category => category.categoryId !== categoryId));
        showSnackbar("Category deleted successfully", "success");
    }

    const handleEditOpen = (category: Category) => {
        setEditingCategory(category);
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditingCategory(null);
        setEditOpen(false);
    };

    const showSnackbar = (message: string, severity: typeof snackbarSeverity = "success") => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    }


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
                    Loading categories, please wait...
                </Typography>
            </Box>
        );
    }

        return (
            <Container sx={{ mt: 4 }}>
                <Typography variant="h4" mb={3} fontWeight={600}>
                    My Categories
                </Typography>
                <CategoriesList categories={categories} onEdit={handleEditOpen} />
                <Box textAlign="center" mt={4}>
                    <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                        Add New Category
                    </Button>
                </Box>
                <AddCategoriesDialog open={open} onClose={() => setOpen(false)} onAdd={handleAddCategory}/>
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
                {editingCategory && (
                    <EditCategoriesDialog
                        open={editOpen}
                        onClose={handleEditClose}
                        category={editingCategory}
                        onUpdate={handleUpdateCategory}
                        onDelete={handleDeleteCategory}
                        onCloseConfirmDelete={() => {}}
                    />
                )}
            </Container>
        )
}