import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Divider,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import api from "../../services/api";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        try {
            setLoading(true);
            setError("");

            const response = await api.post("/auth/login", {
                email,
                password,
            });

            const { jwtToken, user } = response.data;

            // Save JWT
            localStorage.setItem("token", jwtToken);

            // Save user information
            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

            // Redirect according to role
            if (user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/products");
            }

        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f5f7fa",
                py: 4,
            }}
        >
            <Container maxWidth="sm">

                <Card
                    elevation={4}
                    sx={{
                        borderRadius: 3,
                    }}
                >
                    <CardContent
                        sx={{
                            p: {
                                xs: 3,
                                sm: 5,
                            },
                        }}
                    >

                        {/* Logo / Brand */}

                        <Box
                            sx={{
                                textAlign: "center",
                                mb: 4,
                            }}
                        >
                            <ShoppingBagIcon
                                sx={{
                                    fontSize: 50,
                                    color: "primary.main",
                                    mb: 1,
                                }}
                            />

                            <Typography
                                variant="h4"
                                fontWeight="bold"
                            >
                                Welcome Back
                            </Typography>

                            <Typography
                                color="text.secondary"
                                sx={{ mt: 1 }}
                            >
                                Login to your account
                            </Typography>
                        </Box>


                        {/* Error */}

                        {error && (
                            <Alert
                                severity="error"
                                sx={{ mb: 3 }}
                            >
                                {error}
                            </Alert>
                        )}


                        {/* Login Form */}

                        <Box
                            component="form"
                            onSubmit={handleLogin}
                        >

                            <Stack spacing={3}>

                                <TextField
                                    label="Email"
                                    type="email"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(
                                            event.target.value
                                        )
                                    }
                                    fullWidth
                                    required
                                    autoComplete="email"
                                />


                                <TextField
                                    label="Password"
                                    type="password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(
                                            event.target.value
                                        )
                                    }
                                    fullWidth
                                    required
                                    autoComplete="current-password"
                                />


                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    startIcon={
                                        loading ? (
                                            <CircularProgress
                                                size={20}
                                                color="inherit"
                                            />
                                        ) : (
                                            <LoginIcon />
                                        )
                                    }
                                    disabled={loading}
                                    sx={{
                                        py: 1.5,
                                        fontSize: "1rem",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {loading
                                        ? "Logging in..."
                                        : "Login"}
                                </Button>

                            </Stack>

                        </Box>


                        {/* Divider */}

                        <Divider sx={{ my: 4 }}>
                            OR
                        </Divider>


                        {/* Register */}

                        <Box
                            sx={{
                                textAlign: "center",
                            }}
                        >
                            <Typography
                                color="text.secondary"
                                sx={{ mb: 2 }}
                            >
                                Don't have an account?
                            </Typography>

                            <Button
                                variant="outlined"
                                size="large"
                                fullWidth
                                startIcon={
                                    <PersonAddIcon />
                                }
                                onClick={() =>
                                    navigate("/register")
                                }
                            >
                                Create Account
                            </Button>
                        </Box>


                        {/* Back to Products */}

                        <Button
                            variant="text"
                            fullWidth
                            sx={{ mt: 2 }}
                            onClick={() =>
                                navigate("/products")
                            }
                        >
                            Continue as Guest
                        </Button>

                    </CardContent>
                </Card>

            </Container>
        </Box>
    );
};

export default Login;