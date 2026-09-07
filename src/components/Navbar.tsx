import { useNavigate } from "react-router-dom";
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Badge,
} from "@mui/material";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

export default function Navbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                width: "100%",
                maxWidth: "100vw",
                left: 0,
                right: 0,
                top: 0,

                background: "#faf9f6",
                color: "#24231f",
                borderBottom: "1px solid #e8e4dc",

                // Prevent accidental horizontal overflow
                overflow: "hidden",
            }}
        >
            <Toolbar
                disableGutters
                sx={{
                    minHeight: "72px",

                    width: "100%",
                    maxWidth: "100%",

                    px: {
                        xs: 2,
                        sm: 3,
                        md: 4,
                    },

                    boxSizing: "border-box",
                }}
            >
                {/* LOGO */}
                <Box
                    onClick={() => navigate("/")}
                    sx={{
                        cursor: "pointer",
                        flex: 1,
                        minWidth: 0,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "1.15rem",
                            fontWeight: 600,
                            letterSpacing: "0.18em",
                            lineHeight: 1,

                            whiteSpace: "nowrap",
                        }}
                    >
                        GRAH UDYOG
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: "0.58rem",
                            letterSpacing: "0.16em",
                            color: "#817b70",
                            mt: 0.7,

                            whiteSpace: "nowrap",
                        }}
                    >
                        TRUE HONESTY
                    </Typography>
                </Box>

                {/* DESKTOP NAVIGATION */}
                <Box
                    sx={{
                        display: {
                            xs: "none",
                            md: "flex",
                        },

                        alignItems: "center",
                        gap: 1,
                        flexShrink: 0,
                    }}
                >
                    <Button
                        onClick={() => navigate("/products")}
                        sx={{
                            color: "#3c3932",
                            textTransform: "none",
                            fontSize: "0.95rem",
                            px: 2,

                            "&:hover": {
                                background: "#f0eee8",
                            },
                        }}
                    >
                        Shop
                    </Button>

                    <Button
                        onClick={() => navigate("/orders")}
                        sx={{
                            color: "#3c3932",
                            textTransform: "none",
                            fontSize: "0.95rem",
                            px: 2,

                            "&:hover": {
                                background: "#f0eee8",
                            },
                        }}
                    >
                        Orders
                    </Button>

                    {/* CART */}
                    <IconButton
                        onClick={() => navigate("/cart")}
                        sx={{
                            color: "#35322c",
                            ml: 1,

                            "&:hover": {
                                background: "#f0eee8",
                            },
                        }}
                    >
                        <Badge
                            badgeContent={0}
                            sx={{
                                "& .MuiBadge-badge": {
                                    background: "#292821",
                                    color: "#fff",
                                    fontSize: "0.65rem",
                                },
                            }}
                        >
                            <ShoppingCartOutlinedIcon />
                        </Badge>
                    </IconButton>

                    {/* PROFILE / LOGIN */}
                    {token ? (
                        <IconButton
                            onClick={() => navigate("/profile")}
                            sx={{
                                color: "#35322c",
                                ml: 0.5,

                                "&:hover": {
                                    background: "#f0eee8",
                                },
                            }}
                        >
                            <PersonOutlineOutlinedIcon />
                        </IconButton>
                    ) : (
                        <Button
                            onClick={() => navigate("/login")}
                            variant="contained"
                            sx={{
                                ml: 1,
                                px: 2.5,
                                py: 1,

                                borderRadius: "999px",
                                background: "#292821",
                                color: "#fff",

                                textTransform: "none",
                                fontSize: "0.9rem",
                                boxShadow: "none",

                                "&:hover": {
                                    background: "#171712",
                                    boxShadow: "none",
                                },
                            }}
                        >
                            Login
                        </Button>
                    )}
                </Box>

                {/* MOBILE CART */}
                <Box
                    sx={{
                        display: {
                            xs: "flex",
                            md: "none",
                        },

                        alignItems: "center",
                        flexShrink: 0,
                    }}
                >
                    <IconButton
                        onClick={() => navigate("/cart")}
                        sx={{
                            color: "#35322c",
                        }}
                    >
                        <ShoppingCartOutlinedIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}