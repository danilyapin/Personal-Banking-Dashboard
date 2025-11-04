import {type ChangeEvent, useState} from "react";
import {
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";
import axios from "axios";
import { API_URL } from "../../config.ts";

type AddCategoryDialogProps = {
    open: boolean;
    onClose: () => void;
    onAdd: (category: {categoryId: string, userId: string; name: string}) => void;
}

export default function AddCategoriesDialog({open, onClose, onAdd}: AddCategoryDialogProps) {
    const [newCategory, setNewCategory] = useState({
        name: "",
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewCategory({...newCategory, [event.target.name]: event.target.value });
    }

    const handleSubmit = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(`${API_URL}/api/categories`, {
                name: newCategory.name,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            onAdd(response.data);
            setNewCategory({name: ""})
            onClose();
        } catch (error) {
            console.log("Error adding category", error);
        }
    }

    const isFormValid =
        newCategory.name.trim() !== "";

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>
                Add New Category
            </DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Name"
                    name="name"
                    fullWidth
                    required
                    value={newCategory.name}
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
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    disabled={!isFormValid}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}