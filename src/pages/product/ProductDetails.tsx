import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    Container,
    Divider,
    Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

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

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [addingToCart, setAddingToCart] = useState(false);
    const [cartMessage, setCartMessage] = useState("");

    const getProduct = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(`/product/${id}`);

            console.log("PRODUCT DETAIL RESPONSE:", response.data);

            setProduct(response.data);
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Failed to fetch product"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProduct();
    }, [id]);

    // ADD TO CART
    const handleAddToCart = async () => {
        if (!product) {
            return;
        }

        try {
            setAddingToCart(true);
            setError("");
            setCartMessage("");

            await api.post("/cart", {
                productId: product._id,
                quantity: 1,
            });

            setCartMessage(
                "Product added to cart successfully"
            );

        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Failed to add product to cart"
            );
        } finally {
            setAddingToCart(false);
        }
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 10,
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error && !product) {
        return (
            <Container sx={{ mt: 5 }}>
                <Alert severity="error">
                    {error}
                </Alert>

                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate("/products")}
                    sx={{ mt: 2 }}
                >
                    Back to Products
                </Button>
            </Container>
        );
    }

    if (!product) {
        return (
            <Container sx={{ mt: 5 }}>
                <Alert severity="warning">
                    Product not found
                </Alert>
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 5, mb: 5 }}>

            {/* Back Button */}
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate("/products")}
                sx={{ mb: 3 }}
            >
                Back to Products
            </Button>

            {/* Success Message */}
            {cartMessage && (
                <Alert
                    severity="success"
                    sx={{ mb: 3 }}
                >
                    {cartMessage}
                </Alert>
            )}

            {/* Error Message */}
            {error && (
                <Alert
                    severity="error"
                    sx={{ mb: 3 }}
                >
                    {error}
                </Alert>
            )}

            {/* Product Card */}
            <Card
                sx={{
                    display: "flex",
                    flexDirection: {
                        xs: "column",
                        md: "row",
                    },
                }}
            >

                {/* Product Image */}
                <Box
                    sx={{
                        width: {
                            xs: "100%",
                            md: "50%",
                        },
                    }}
                >
                    {product.image ? (
                        <CardMedia
                            component="img"
                            image={product.image}
                            alt={product.title}
                            sx={{
                                height: {
                                    xs: 300,
                                    md: 500,
                                },
                                objectFit: "contain",
                            }}
                        />
                    ) : (
                        <Box
                            sx={{
                                height: 400,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#f5f5f5",
                            }}
                        >
                            <Typography color="text.secondary">
                                No Image Available
                            </Typography>
                        </Box>
                    )}
                </Box>

                {/* Product Information */}
                <CardContent
                    sx={{
                        width: {
                            xs: "100%",
                            md: "50%",
                        },
                        p: 4,
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h1"
                        gutterBottom
                    >
                        {product.title}
                    </Typography>

                    <Typography
                        variant="h6"
                        color="text.secondary"
                        gutterBottom
                    >
                        {product.name}
                    </Typography>

                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: "bold",
                            mt: 3,
                            mb: 2,
                        }}
                    >
                        ₹{product.price}
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    {/* Category */}
                    <Typography
                        variant="body1"
                        sx={{ mb: 2 }}
                    >
                        <strong>Category:</strong>{" "}
                        {product.category.join(", ")}
                    </Typography>

                    {/* Size */}
                    <Typography
                        variant="body1"
                        sx={{ mb: 2 }}
                    >
                        <strong>Available Sizes:</strong>{" "}
                        {product.size.length > 0
                            ? product.size.join(", ")
                            : "Not available"}
                    </Typography>

                    {/* Color */}
                    <Typography
                        variant="body1"
                        sx={{ mb: 2 }}
                    >
                        <strong>Available Colors:</strong>{" "}
                        {product.color.length > 0
                            ? product.color.join(", ")
                            : "Not available"}
                    </Typography>

                    {/* Stock */}
                    <Typography
                        variant="body1"
                        sx={{
                            mb: 3,
                            color: product.inStock
                                ? "success.main"
                                : "error.main",
                            fontWeight: "bold",
                        }}
                    >
                        {product.inStock
                            ? "✓ In Stock"
                            : "✕ Out of Stock"}
                    </Typography>

                    {/* Add To Cart */}
                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        startIcon={<ShoppingCartIcon />}
                        disabled={
                            !product.inStock ||
                            addingToCart
                        }
                        onClick={handleAddToCart}
                    >
                        {addingToCart
                            ? "Adding..."
                            : product.inStock
                                ? "Add to Cart"
                                : "Out of Stock"}
                    </Button>

                    {/* Go To Cart */}
                    {cartMessage && (
                        <Button
                            variant="outlined"
                            size="large"
                            fullWidth
                            sx={{ mt: 2 }}
                            onClick={() =>
                                navigate("/cart")
                            }
                        >
                            Go to Cart
                        </Button>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
};

export default ProductDetails;