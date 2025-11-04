import {
    Alert,
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Snackbar,
    TextField,
    Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import { API_URL } from "../../config.ts";

type EditCategoryProps = {
    open: boolean;
    onClose: () => void;
    onCloseConfirmDelete: () => void;
    category: { categoryId: string, userId: string, name: string }
    onUpdate: (category: {categoryId: string, userId: string, name: string}) => void;
    onDelete: (categoryId: string) => void;
}

export default function EditCategoriesDialog({open, onClose, onCloseConfirmDelete, category, onUpdate, onDelete}: EditCategoryProps) {
    const [editedCategory, setEditedCategory] = useState(
        {
        name: ""
    });
    
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    
    useEffect(() => {
        if (category){
            setEditedCategory({
                name: category.name,
            })
        }
    }, [category])

    const handleDelete = async () => {
        const token = localStorage.getItem("token");

        try {
            await axios.delete(`${API_URL}/api/categories/${category.categoryId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            onDelete(category.categoryId);
            setSnackbarOpen(true)
            onClose()
        } catch (error) {
            console.log("Error deleting category", error)
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedCategory({...editedCategory, [event.target.name]: event.target.value})
    }

    const handleSubmit = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.put(`${API_URL}/api/categories/${category.categoryId}`, {
                name: editedCategory.name,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            onUpdate(response.data);
            onClose();
        } catch (error) {
            console.log("Error updating category", error)
        }
    }

    const handleOpenConfirmDelete = () => {
        setConfirmDeleteOpen(true);
    }

    const handleCloseConfirmDelete = () => {
        setConfirmDeleteOpen(false);
    }

    const isFormValid = editedCategory.name.trim() !== "";

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Edit Category</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Name"
                        name="name"
                        fullWidth
                        required
                        value={editedCategory.name}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleOpenConfirmDelete}
                        variant="contained"
                        color="error"
                        sx={{
                            '&:hover': {
                                backgroundColor: 'white',
                                color: 'var(--error-color)',
                            },
                        }}
                    >
                        Delete
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        disabled={!isFormValid}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            {confirmDeleteOpen && (
                <Dialog open={confirmDeleteOpen} onClose={onCloseConfirmDelete}>
                    <DialogTitle>Delete Account</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Are you sure you want to delete this category?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleCloseConfirmDelete}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDelete}
                            variant="contained"
                            color="error"
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'white',
                                    color: 'var(--error-color)',
                                },
                            }}
                        >
                            Delete
                        </Button>
                    </DialogActions>
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={3000}
                        onClose={() => setSnackbarOpen(false)}
                        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    >
                        <Alert
                            onClose={() => setSnackbarOpen(false)}
                            severity="success"
                            sx={{ width: "100%" }}
                        >
                            Category deleted successfully!
                        </Alert>
                    </Snackbar>
                </Dialog>
            )}
        </>
    )
}