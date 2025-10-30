import {
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    Typography
} from "@mui/material";


type Category = {
    categoryId: string;
    userId: string;
    name: string;
}

type CategoriesListProps = {
    categories: Category[];
    onEdit: (category: Category) => void;
}

export default function CategoriesList({categories, onEdit}: CategoriesListProps) {


    return (
        <div>
            <Stack spacing={3} mt={2}>
                {categories.length === 0 ? (
                    <Stack alignItems="center" mt={3}>
                        <Typography variant="h6" fontWeight={600}>
                            No categories found.
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            textAlign="center"
                            mt={1}
                            maxWidth={500}
                        >
                            Categories help you organize your transactions and track your spending.
                            Examples: <strong>Groceries</strong>, <strong>Rent</strong>, <strong>Salary</strong>.
                            First, create your categories so that every transaction can be assigned properly.
                            Next, go to <strong>Accounts</strong> to create an account and start adding transactions.
                        </Typography>

                    </Stack>
                ) : (
                    categories.map((cat) => {
                        return (
                            <Card
                                key={cat.categoryId}
                                elevation={3}
                                sx={{
                                    p: 1,
                                    borderRadius: 3,
                                    transition: '0.3s',
                                    '&:hover': { boxShadow: 6 },
                                }}>
                                <CardContent
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box>
                                        <Typography variant="h6" fontWeight={500}>{cat.name}</Typography>
                                    </Box>
                                    <Box textAlign="right">
                                        <Stack direction="column" spacing={1} alignItems="flex-end" mt={1}>
                                            <Button size="small" variant="outlined" onClick={() => onEdit(cat)}>
                                                Edit category
                                            </Button>
                                        </Stack>
                                    </Box>
                                </CardContent>
                            </Card>
                        );
                    })
                )}
            </Stack>
        </div>
    )
}