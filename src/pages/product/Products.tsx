import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    Container,
    Grid,
    Typography,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";

import api from "../../services/api";

interface Product {
    _id: string;
    title: string;
    name: string;
    category: string[];
    price: number;
    image?: string;
    size: string[];
    color: string[];
    inStock: boolean;
}

const Products = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getProducts = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/product");

            setProducts(response.data.products);
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Failed to fetch products"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    // Loading
    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "70vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    // Error
    if (error) {
        return (
            <Container sx={{ mt: 5 }}>
                <Alert severity="error">
                    {error}
                </Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 5 }}>

            {/* Page Heading */}
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h4"
                    component="h1"
                    fontWeight="bold"
                    gutterBottom
                >
                    Products
                </Typography>

                <Typography
                    variant="body1"
                    color="text.secondary"
                >
                    Explore our latest products
                </Typography>
            </Box>

            {/* No Products */}
            {products.length === 0 ? (
                <Alert severity="info">
                    No products found
                </Alert>
            ) : (
                <Grid container spacing={3}>
                    {products.map((product) => (
                        <Grid
                            key={product._id}
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 4,
                            }}
                        >
                            <Card
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    transition: "0.3s",
                                    "&:hover": {
                                        transform:
                                            "translateY(-5px)",
                                    },
                                }}
                            >

                                {/* Product Image */}
                                {product.image ? (
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={product.image}
                                        alt={product.title}
                                        sx={{
                                            objectFit: "contain",
                                        }}
                                    />
                                ) : (
                                    <Box
                                        sx={{
                                            height: 250,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent:
                                                "center",
                                            backgroundColor:
                                                "#f5f5f5",
                                        }}
                                    >
                                        <Typography
                                            color="text.secondary"
                                        >
                                            No Image
                                        </Typography>
                                    </Box>
                                )}

                                <CardContent sx={{ flexGrow: 1 }}>

                                    {/* Title */}
                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                        gutterBottom
                                    >
                                        {product.title}
                                    </Typography>

                                    {/* Name */}
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        {product.name}
                                    </Typography>

                                    {/* Category */}
                                    <Typography
                                        variant="body2"
                                        sx={{ mt: 1 }}
                                    >
                                        <strong>
                                            Category:
                                        </strong>{" "}
                                        {product.category.join(
                                            ", "
                                        )}
                                    </Typography>

                                    {/* Price */}
                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                        sx={{ mt: 2 }}
                                    >
                                        ₹{product.price}
                                    </Typography>

                                    {/* Stock */}
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mt: 1,
                                            fontWeight:
                                                "bold",
                                            color: product.inStock
                                                ? "success.main"
                                                : "error.main",
                                        }}
                                    >
                                        {product.inStock
                                            ? "✓ In Stock"
                                            : "✕ Out of Stock"}
                                    </Typography>

                                </CardContent>

                                {/* Actions */}
                                <CardActions sx={{ p: 2 }}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        startIcon={
                                            <VisibilityIcon />
                                        }
                                        onClick={() =>
                                            navigate(
                                                `/products/${product._id}`
                                            )
                                        }
                                    >
                                        View Details
                                    </Button>
                                </CardActions>

                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default Products;