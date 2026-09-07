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

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import api from "../../services/api";

const Register = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        try {
            setLoading(true);
            setError("");
            setMessage("");

            const response = await api.post("/auth/register", {
                name,
                email,
                password,
            });

            setMessage(
                response.data.message ||
                "Registration successful"
            );

            setName("");
            setEmail("");
            setPassword("");

            // Go to login after successful registration
            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Registration failed"
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
                                Create Account
                            </Typography>

                            <Typography
                                color="text.secondary"
                                sx={{ mt: 1 }}
                            >
                                Create your account to get started
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


                        {/* Success */}

                        {message && (
                            <Alert
                                severity="success"
                                sx={{ mb: 3 }}
                            >
                                {message}
                            </Alert>
                        )}


                        {/* Register Form */}

                        <Box
                            component="form"
                            onSubmit={handleRegister}
                        >

                            <Stack spacing={3}>

                                <TextField
                                    label="Full Name"
                                    type="text"
                                    value={name}
                                    onChange={(event) =>
                                        setName(
                                            event.target.value
                                        )
                                    }
                                    fullWidth
                                    required
                                    autoComplete="name"
                                />


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
                                    autoComplete="new-password"
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
                                            <PersonAddIcon />
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
                                        ? "Registering..."
                                        : "Create Account"}
                                </Button>

                            </Stack>

                        </Box>


                        {/* Divider */}

                        <Divider sx={{ my: 4 }}>
                            OR
                        </Divider>


                        {/* Login */}

                        <Box
                            sx={{
                                textAlign: "center",
                            }}
                        >
                            <Typography
                                color="text.secondary"
                                sx={{ mb: 2 }}
                            >
                                Already have an account?
                            </Typography>

                            <Button
                                variant="outlined"
                                size="large"
                                fullWidth
                                startIcon={
                                    <LoginIcon />
                                }
                                onClick={() =>
                                    navigate("/login")
                                }
                            >
                                Login
                            </Button>
                        </Box>


                        {/* Continue as Guest */}

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

export default Register;