import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Stack,
    Typography,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";

import api from "../../services/api";

interface OrderProduct {
    productId: string;
    title: string;
    quantity: number;
    price: number;
    totalProductPrice: number;
}

interface Order {
    _id: string;
    products: OrderProduct[];
    addressId: string;
    totalAmount: number;
    paymentStatus: "pending" | "paid" | "failed";
    orderStatus:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
    createdAt: string;
}

const Orders = () => {
    const navigate = useNavigate();

    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getOrders = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/order");

            setOrders(response.data.orders);
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Failed to fetch orders"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: "70vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container
            maxWidth="lg"
            sx={{
                py: 5,
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    mb: 4,
                    fontWeight: "bold",
                }}
            >
                My Orders
            </Typography>

            {error && (
                <Alert
                    severity="error"
                    sx={{
                        mb: 3,
                    }}
                >
                    {error}
                </Alert>
            )}

            {orders.length === 0 ? (
                <Alert severity="info">
                    You have no orders yet.
                </Alert>
            ) : (
                <Stack spacing={3}>
                    {orders.map((order) => (
                        <Card
                            key={order._id}
                            elevation={2}
                        >
                            <CardContent>
                                <Stack
                                    direction={{
                                        xs: "column",
                                        md: "row",
                                    }}
                                    spacing={2}
                                    sx={{
                                        justifyContent:
                                            "space-between",
                                    }}
                                >
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight:
                                                    "bold",
                                            }}
                                        >
                                            Order #{order._id}
                                        </Typography>

                                        <Typography
                                            color="text.secondary"
                                            sx={{
                                                mt: 1,
                                            }}
                                        >
                                            {new Date(
                                                order.createdAt
                                            ).toLocaleString()}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                mt: 1,
                                            }}
                                        >
                                            <strong>
                                                Products:
                                            </strong>{" "}
                                            {
                                                order.products
                                                    .length
                                            }
                                        </Typography>

                                        <Typography
                                            sx={{
                                                mt: 1,
                                                fontWeight:
                                                    "bold",
                                            }}
                                        >
                                            Total: ₹
                                            {
                                                order.totalAmount
                                            }
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography
                                            sx={{
                                                fontWeight:
                                                    "bold",
                                                textTransform:
                                                    "capitalize",
                                            }}
                                        >
                                            Order Status:{" "}
                                            {
                                                order.orderStatus
                                            }
                                        </Typography>

                                        <Typography
                                            sx={{
                                                mt: 1,
                                                fontWeight:
                                                    "bold",
                                                textTransform:
                                                    "capitalize",
                                            }}
                                        >
                                            Payment:{" "}
                                            {
                                                order.paymentStatus
                                            }
                                        </Typography>
                                    </Box>

                                    <Button
                                        variant="contained"
                                        startIcon={
                                            <VisibilityIcon />
                                        }
                                        onClick={() =>
                                            navigate(
                                                `/orders/${order._id}`
                                            )
                                        }
                                    >
                                        View Order
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            )}
        </Container>
    );
};

export default Orders;