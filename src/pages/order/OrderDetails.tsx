import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRazorpay } from "react-razorpay";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Container,
    Divider,
    Grid,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";

import CancelIcon from "@mui/icons-material/Cancel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";

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

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const { Razorpay } = useRazorpay();

    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [cancelling, setCancelling] = useState(false);
    const [error, setError] = useState("");
    const handlePayment = async () => {
        try {
            setError("");

            const response = await api.post("/payment", {
                orderId: order._id,
            });

            const { razorpayOrder } = response.data;

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                name: "E-Commerce",
                description: `Payment for Order ${order._id}`,
                order_id: razorpayOrder.id,

                handler: async (paymentResponse: any) => {
                    try {
                        await api.post("/payment/verify", {
                            orderId: order._id,
                            razorpayOrderId:
                                paymentResponse.razorpay_order_id,
                            razorpayPaymentId:
                                paymentResponse.razorpay_payment_id,
                            razorpaySignature:
                                paymentResponse.razorpay_signature,
                        });

                        await getOrder();
                    } catch (err: any) {
                        setError(
                            err.response?.data?.message ||
                            "Payment verification failed"
                        );
                    }
                },

                theme: {
                    color: "#1976d2",
                },
            };

            const razorpay = new Razorpay(options);

            razorpay.open();
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Failed to initiate payment"
            );
        }
    };

    const getOrder = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(`/order/${id}`);

            setOrder(response.data.order);
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Failed to fetch order details"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            getOrder();
        }
    }, [id]);

    const handleCancelOrder = async () => {
        if (
            !window.confirm(
                "Are you sure you want to cancel this order?"
            )
        ) {
            return;
        }

        try {
            setCancelling(true);
            setError("");

            const response = await api.delete(`/order/${id}`);

            setOrder(response.data.order);
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Failed to cancel order"
            );
        } finally {
            setCancelling(false);
        }
    };

    const getStatusChip = (
        status: Order["orderStatus"]
    ) => {
        const config = {
            pending: {
                color: "warning",
                label: "Pending",
            },
            confirmed: {
                color: "info",
                label: "Confirmed",
            },
            processing: {
                color: "primary",
                label: "Processing",
            },
            shipped: {
                color: "success",
                label: "Shipped",
            },
            delivered: {
                color: "success",
                label: "Delivered",
            },
            cancelled: {
                color: "error",
                label: "Cancelled",
            },
        };

        const { color, label } =
            config[status] || config.pending;

        return (
            <Chip
                label={label}
                color={color as any}
                size="small"
                sx={{
                    fontWeight: 600,
                }}
            />
        );
    };

    const getPaymentStatusChip = (
        status: Order["paymentStatus"]
    ) => {
        const config = {
            pending: {
                color: "warning",
                label: "Pending",
            },
            paid: {
                color: "success",
                label: "Paid",
            },
            failed: {
                color: "error",
                label: "Failed",
            },
        };

        const { color, label } =
            config[status] || config.pending;

        return (
            <Chip
                label={label}
                color={color as any}
                size="small"
                sx={{
                    fontWeight: 600,
                }}
            />
        );
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString(
            "en-IN",
            {
                dateStyle: "medium",
                timeStyle: "short",
            }
        );
    };

    const canCancel =
        order &&
        order.orderStatus !== "shipped" &&
        order.orderStatus !== "delivered" &&
        order.orderStatus !== "cancelled";

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
                <CircularProgress
                    size={60}
                    thickness={4}
                />
            </Box>
        );
    }

    if (error && !order) {
        return (
            <Container
                maxWidth="md"
                sx={{
                    py: 6,
                }}
            >
                <Alert
                    severity="error"
                    variant="filled"
                    sx={{
                        mb: 3,
                    }}
                >
                    {error}
                </Alert>

                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate("/orders")}
                    sx={{
                        textTransform: "none",
                        fontWeight: 600,
                    }}
                >
                    Back to Orders
                </Button>
            </Container>
        );
    }

    if (!order) {
        return (
            <Container
                maxWidth="md"
                sx={{
                    py: 6,
                }}
            >
                <Alert
                    severity="info"
                    variant="outlined"
                >
                    Order not found
                </Alert>
            </Container>
        );
    }

    return (
        <Container
            maxWidth="md"
            sx={{
                py: 6,
            }}
        >
            {/* Header */}

            <Box
                sx={{
                    mb: 4,
                }}
            >
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate("/orders")}
                    sx={{
                        mb: 3,
                        textTransform: "none",
                        fontWeight: 500,
                    }}
                >
                    Back to Orders
                </Button>

                <Typography
                    variant="h4"
                    sx={{
                        mb: 1,
                        fontWeight: "bold",
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    Order Details
                </Typography>

                <Typography
                    variant="body1"
                    color="text.secondary"
                >
                    Track and manage your order
                </Typography>
            </Box>

            {/* Error */}

            {error && (
                <Alert
                    severity="error"
                    variant="filled"
                    sx={{
                        mb: 4,
                    }}
                >
                    {error}
                </Alert>
            )}

            {/* Order Information */}

            <Card
                elevation={3}
                sx={{
                    mb: 4,
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow:
                        "0 8px 32px rgba(0,0,0,0.08)",
                }}
            >
                <CardContent
                    sx={{
                        p: 4,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 3,
                        }}
                    >
                        <ShoppingBagIcon
                            sx={{
                                mr: 2,
                                color: "primary.main",
                            }}
                        />

                        <Typography
                            variant="h6"
                            color="primary.main"
                            sx={{
                                fontWeight: "bold",
                            }}
                        >
                            Order Information
                        </Typography>
                    </Box>

                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                            }}
                        >
                            <Stack spacing={2}>
                                <Box>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{
                                            display: "block",
                                            mb: 0.5,
                                            fontWeight: 500,
                                        }}
                                    >
                                        Order ID
                                    </Typography>

                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontWeight: 600,
                                            wordBreak:
                                                "break-all",
                                        }}
                                    >
                                        {order._id}
                                    </Typography>
                                </Box>

                                <Box>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{
                                            display: "block",
                                            mb: 0.5,
                                            fontWeight: 500,
                                        }}
                                    >
                                        Order Date
                                    </Typography>

                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        sx={{
                                            alignItems:
                                                "center",
                                        }}
                                    >
                                        <AccessTimeIcon
                                            fontSize="small"
                                            color="action"
                                        />

                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontWeight: 500,
                                            }}
                                        >
                                            {formatDate(
                                                order.createdAt
                                            )}
                                        </Typography>
                                    </Stack>
                                </Box>
                            </Stack>
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                            }}
                        >
                            <Stack spacing={2}>
                                <Box>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{
                                            display: "block",
                                            mb: 0.5,
                                            fontWeight: 500,
                                        }}
                                    >
                                        Order Status
                                    </Typography>

                                    {getStatusChip(
                                        order.orderStatus
                                    )}
                                </Box>

                                <Box>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{
                                            display: "block",
                                            mb: 0.5,
                                            fontWeight: 500,
                                        }}
                                    >
                                        Payment Status
                                    </Typography>

                                    {getPaymentStatusChip(
                                        order.paymentStatus
                                    )}
                                </Box>
                            </Stack>
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                            }}
                        >
                            <Box>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{
                                        display: "block",
                                        mb: 0.5,
                                        fontWeight: 500,
                                    }}
                                >
                                    Delivery Address
                                </Typography>

                                <Stack
                                    direction="row"
                                    spacing={1}
                                    sx={{
                                        alignItems:
                                            "flex-start",
                                    }}
                                >
                                    <LocationOnIcon
                                        fontSize="small"
                                        color="action"
                                        sx={{
                                            mt: 0.3,
                                        }}
                                    />

                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        sx={{
                                            fontWeight: 500,
                                        }}
                                    >
                                        Address ID:{" "}
                                        {order.addressId}
                                    </Typography>
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Products */}

            <Card
                elevation={3}
                sx={{
                    mb: 4,
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow:
                        "0 8px 32px rgba(0,0,0,0.08)",
                }}
            >
                <CardContent
                    sx={{
                        p: 4,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 3,
                        }}
                    >
                        <ShoppingBagIcon
                            sx={{
                                mr: 2,
                                color: "secondary.main",
                            }}
                        />

                        <Typography
                            variant="h6"
                            color="secondary.main"
                            sx={{
                                fontWeight: "bold",
                            }}
                        >
                            Products (
                            {order.products.length})
                        </Typography>
                    </Box>

                    {order.products.length === 0 ? (
                        <Box
                            sx={{
                                py: 6,
                                textAlign: "center",
                            }}
                        >
                            <ShoppingBagIcon
                                sx={{
                                    fontSize: 64,
                                    color: "action.disabled",
                                    mb: 2,
                                }}
                            />

                            <Typography
                                variant="h6"
                                color="text.secondary"
                                sx={{
                                    fontWeight: 500,
                                }}
                            >
                                No products in this order
                            </Typography>
                        </Box>
                    ) : (
                        <Stack spacing={2}>
                            {order.products.map(
                                (product, index) => (
                                    <Box
                                        key={
                                            product.productId
                                        }
                                    >
                                        <Stack
                                            direction={{
                                                xs: "column",
                                                sm: "row",
                                            }}
                                            spacing={2}
                                            sx={{
                                                justifyContent:
                                                    "space-between",
                                                alignItems:
                                                {
                                                    xs: "stretch",
                                                    sm: "center",
                                                },
                                                p: 2,
                                                borderRadius: 2,
                                                bgcolor:
                                                    "background.default",
                                                transition:
                                                    "all 0.2s",
                                                "&:hover": {
                                                    bgcolor:
                                                        "action.hover",
                                                    transform:
                                                        "translateX(4px)",
                                                },
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    flex: 1,
                                                }}
                                            >
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        mb: 1,
                                                        fontWeight:
                                                            "bold",
                                                        color: "text.primary",
                                                    }}
                                                >
                                                    {
                                                        product.title
                                                    }
                                                </Typography>

                                                <Stack
                                                    direction="row"
                                                    spacing={3}
                                                    sx={{
                                                        alignItems:
                                                            "center",
                                                        flexWrap:
                                                            "wrap",
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            display:
                                                                "flex",
                                                            alignItems:
                                                                "center",
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                        >
                                                            Qty:
                                                        </Typography>

                                                        <Chip
                                                            label={
                                                                product.quantity
                                                            }
                                                            size="small"
                                                            sx={{
                                                                ml: 1,
                                                                fontWeight: 600,
                                                            }}
                                                        />
                                                    </Box>

                                                    <Box
                                                        sx={{
                                                            display:
                                                                "flex",
                                                            alignItems:
                                                                "center",
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                        >
                                                            Price:
                                                        </Typography>

                                                        <Typography
                                                            component="span"
                                                            sx={{
                                                                ml: 1,
                                                                fontWeight:
                                                                    600,
                                                            }}
                                                        >
                                                            ₹
                                                            {
                                                                product.price
                                                            }
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                            </Box>

                                            <Box
                                                sx={{
                                                    textAlign:
                                                    {
                                                        xs: "left",
                                                        sm: "right",
                                                    },
                                                    minWidth: 120,
                                                }}
                                            >
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                    sx={{
                                                        display:
                                                            "block",
                                                        mb: 0.5,
                                                    }}
                                                >
                                                    Total
                                                </Typography>

                                                <Typography
                                                    variant="h6"
                                                    color="primary.main"
                                                    sx={{
                                                        fontWeight:
                                                            "bold",
                                                    }}
                                                >
                                                    ₹
                                                    {
                                                        product.totalProductPrice
                                                    }
                                                </Typography>
                                            </Box>
                                        </Stack>

                                        {index <
                                            order.products
                                                .length -
                                            1 && (
                                                <Divider
                                                    sx={{
                                                        my: 2,
                                                    }}
                                                />
                                            )}
                                    </Box>
                                )
                            )}
                        </Stack>
                    )}
                </CardContent>
            </Card>

            {/* Total & Actions */}

            <Card
                elevation={3}
                sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow:
                        "0 8px 32px rgba(0,0,0,0.08)",
                    bgcolor: "primary.light",
                }}
            >
                <CardContent
                    sx={{
                        p: 4,
                    }}
                >
                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row",
                        }}
                        spacing={2}
                        sx={{
                            mb: 3,
                            justifyContent:
                                "space-between",
                            alignItems: {
                                xs: "flex-start",
                                sm: "center",
                            },
                        }}
                    >
                        <Typography
                            variant="h6"
                            color="text.secondary"
                            sx={{
                                fontWeight: "bold",
                            }}
                        >
                            Total Amount
                        </Typography>

                        <Typography
                            variant="h4"
                            color="primary.main"
                            sx={{
                                fontWeight: "bold",
                                textShadow:
                                    "0 2px 4px rgba(0,0,0,0.1)",
                            }}
                        >
                            ₹{order.totalAmount}
                        </Typography>
                    </Stack>

                    {order.paymentStatus === "pending" &&
                        order.orderStatus !== "cancelled" && (
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                onClick={handlePayment}
                                sx={{
                                    mt: 2,
                                    px: 4,
                                    py: 1.5,
                                    textTransform: "none",
                                    fontWeight: 600,
                                    borderRadius: 2,
                                }}
                            >
                                Pay Now ₹{order.totalAmount}
                            </Button>
                        )}

                    {canCancel && (
                        <Button
                            variant="contained"
                            color="error"
                            startIcon={<CancelIcon />}
                            onClick={handleCancelOrder}
                            disabled={cancelling}
                            size="large"
                            sx={{
                                mt: 2,
                                px: 4,
                                py: 1.5,
                                textTransform: "none",
                                fontWeight: 600,
                                borderRadius: 2,
                                boxShadow:
                                    "0 4px 12px rgba(244,67,54,0.3)",
                                "&:hover": {
                                    boxShadow:
                                        "0 6px 20px rgba(244,67,54,0.4)",
                                },
                            }}
                        >
                            {cancelling
                                ? "Cancelling..."
                                : "Cancel Order"}
                        </Button>
                    )}

                    {order.orderStatus ===
                        "cancelled" && (
                            <Alert
                                severity="info"
                                variant="outlined"
                                sx={{
                                    mt: 3,
                                    borderRadius: 2,
                                    fontWeight: 500,
                                }}
                            >
                                This order has been cancelled
                            </Alert>
                        )}
                </CardContent>
            </Card>
        </Container>
    );
};

export default OrderDetails;