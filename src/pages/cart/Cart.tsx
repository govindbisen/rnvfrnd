import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    IconButton,
    Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import api from "../../services/api";

interface CartItem {
    title: string;
    productId: string;
    quantity: number;
    price: number;
    totalProductPrice: number;
}

interface Cart {
    _id: string;
    userId: string;
    products: CartItem[];
}

const Cart = () => {
    const navigate = useNavigate();

    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getCart = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/cart");

            setCart(response.data);
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Failed to fetch cart"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCart();
    }, []);

    // UPDATE QUANTITY
    const updateQuantity = async (
        productId: string,
        quantity: number
    ) => {
        if (quantity < 1) {
            return;
        }

        try {
            const response = await api.put(
                `/cart/${productId}`,
                {
                    quantity,
                }
            );

            setCart(response.data.cart);
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Failed to update cart"
            );
        }
    };

    // REMOVE ITEM
    const removeItem = async (productId: string) => {
        try {
            const response = await api.delete(
                `/cart/${productId}`
            );

            setCart(response.data.cart);
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Failed to remove item"
            );
        }
    };

    // CLEAR CART
    const clearCart = async () => {
        try {
            const response = await api.delete("/cart");

            setCart(response.data.cart);
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Failed to clear cart"
            );
        }
    };

    // LOADING
    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 10,
                }}
            >
                <Typography>
                    Loading cart...
                </Typography>
            </Box>
        );
    }

    // ERROR
    if (error && !cart) {
        return (
            <Container sx={{ mt: 5 }}>
                <Alert severity="error">
                    {error}
                </Alert>

                <Button
                    startIcon={<ShoppingBagIcon />}
                    onClick={() => navigate("/products")}
                    sx={{ mt: 2 }}
                >
                    Continue Shopping
                </Button>
            </Container>
        );
    }

    // EMPTY CART
    if (!cart || cart.products.length === 0) {
        return (
            <Container
                maxWidth="md"
                sx={{
                    py: 10,
                    textAlign: "center",
                }}
            >
                <ShoppingBagIcon
                    sx={{
                        fontSize: 70,
                        color: "text.secondary",
                    }}
                />

                <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{ mt: 2 }}
                >
                    Your Cart is Empty
                </Typography>

                <Typography
                    color="text.secondary"
                    sx={{ mt: 1, mb: 4 }}
                >
                    Add some products to your cart.
                </Typography>

                <Button
                    variant="contained"
                    onClick={() => navigate("/products")}
                >
                    Continue Shopping
                </Button>
            </Container>
        );
    }

    // CALCULATE CART TOTAL
    const cartTotal = cart.products.reduce(
        (total, item) =>
            total + item.totalProductPrice,
        0
    );

    return (
        <Container
            maxWidth="lg"
            sx={{ py: 5 }}
        >
            {/* HEADER */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 4,
                }}
            >
                <Box>
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                    >
                        Shopping Cart
                    </Typography>

                    <Typography
                        color="text.secondary"
                    >
                        {cart.products.length}{" "}
                        {cart.products.length === 1
                            ? "item"
                            : "items"}
                    </Typography>
                </Box>

                <Button
                    color="error"
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={clearCart}
                >
                    Clear Cart
                </Button>
            </Box>

            {error && (
                <Alert
                    severity="error"
                    sx={{ mb: 3 }}
                >
                    {error}
                </Alert>
            )}

            {/* CART ITEMS */}
            {cart.products.map((item) => (
                <Card
                    key={item.productId}
                    sx={{ mb: 2 }}
                >
                    <CardContent>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent:
                                    "space-between",
                                gap: 2,
                                flexWrap: "wrap",
                            }}
                        >
                            {/* PRODUCT INFO */}
                            <Box
                                sx={{
                                    flex: 1,
                                    minWidth: 200,
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                >
                                    {item.title}
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                >
                                    ₹{item.price} per item
                                </Typography>
                            </Box>

                            {/* QUANTITY */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems:
                                        "center",
                                    border: "1px solid",
                                    borderColor:
                                        "divider",
                                    borderRadius: 1,
                                }}
                            >
                                <IconButton
                                    onClick={() =>
                                        updateQuantity(
                                            item.productId,
                                            item.quantity - 1
                                        )
                                    }
                                    disabled={
                                        item.quantity <=
                                        1
                                    }
                                >
                                    <RemoveIcon />
                                </IconButton>

                                <Typography
                                    sx={{
                                        px: 2,
                                        fontWeight:
                                            "bold",
                                    }}
                                >
                                    {item.quantity}
                                </Typography>

                                <IconButton
                                    onClick={() =>
                                        updateQuantity(
                                            item.productId,
                                            item.quantity + 1
                                        )
                                    }
                                >
                                    <AddIcon />
                                </IconButton>
                            </Box>

                            {/* ITEM TOTAL */}
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                sx={{
                                    minWidth: 100,
                                    textAlign:
                                        "right",
                                }}
                            >
                                ₹
                                {item.totalProductPrice}
                            </Typography>

                            {/* DELETE */}
                            <IconButton
                                color="error"
                                onClick={() =>
                                    removeItem(
                                        item.productId
                                    )
                                }
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </CardContent>
                </Card>
            ))}

            {/* SUMMARY */}
            <Card
                sx={{
                    mt: 4,
                    ml: "auto",
                    maxWidth: 400,
                }}
            >
                <CardContent>
                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        gutterBottom
                    >
                        Order Summary
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent:
                                "space-between",
                            mb: 2,
                        }}
                    >
                        <Typography>
                            Subtotal
                        </Typography>

                        <Typography fontWeight="bold">
                            ₹{cartTotal}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent:
                                "space-between",
                            mb: 3,
                        }}
                    >
                        <Typography>
                            Total
                        </Typography>

                        <Typography
                            variant="h6"
                            fontWeight="bold"
                        >
                            ₹{cartTotal}
                        </Typography>
                    </Box>

                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={() =>
                            navigate("/address")
                        }
                    >
                        Proceed to Address
                    </Button>

                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 2 }}
                        onClick={() =>
                            navigate("/products")
                        }
                    >
                        Continue Shopping
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Cart;