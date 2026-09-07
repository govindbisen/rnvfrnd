import { useNavigate } from "react-router-dom";
import ParkOutlinedIcon from "@mui/icons-material/ParkOutlined";
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    Container,
    Grid,
    Stack,
    Typography,
} from "@mui/material";

import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import CheckroomOutlinedIcon from "@mui/icons-material/CheckroomOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const categories = [
    {
        title: "Hut Making",
        description: "Simple spaces, thoughtfully made.",
        icon: <HomeWorkOutlinedIcon />,
        value: "hut-making",
    },
    {
        title: "Food",
        description: "Food for everyday life.",
        icon: <RestaurantOutlinedIcon />,
        value: "food",
    },
    {
        title: "Books",
        description: "Knowledge worth keeping.",
        icon: <MenuBookOutlinedIcon />,
        value: "book",
    },
    {
        title: "Gau",
        description: "Products rooted in care.",
        icon: <PetsOutlinedIcon />,
        value: "gau",
    },
    {
        title: "Cloth",
        description: "Useful. Comfortable. Honest.",
        icon: <CheckroomOutlinedIcon />,
        value: "cloth",
    },
];

export default function Home() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: "calc(100vh - 64px)",
                background: "#faf9f6",
                color: "#24231f",
            }}
        >
            {/* FLOATING LAND DONATION */}

            <Container maxWidth="lg">

                {/* HERO */}
                {/* HERO */}
                <Box
                    sx={{
                        minHeight: {
                            xs: "72vh",
                            md: "76vh",
                        },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        px: 2,
                        py: {
                            xs: 7,
                            md: 8,
                        },
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: 900,
                        }}
                    >
                        {/* BRAND LABEL */}
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "0.68rem",
                                    md: "0.78rem",
                                },
                                letterSpacing: {
                                    xs: "0.28em",
                                    md: "0.38em",
                                },
                                fontWeight: 600,
                                color: "#756f63",
                                mb: {
                                    xs: 3,
                                    md: 4,
                                },
                            }}
                        >
                            GRAH UDYOG
                        </Typography>


                        {/* MAIN STATEMENT */}
                        <Typography
                            component="h1"
                            sx={{
                                fontSize: {
                                    xs: "2.9rem",
                                    sm: "4.3rem",
                                    md: "5.8rem",
                                },
                                lineHeight: 1.02,
                                fontWeight: 500,
                                letterSpacing: "-0.055em",
                                color: "#24231f",
                                mb: 1.5,
                            }}
                        >
                            सत्यं चर · सत्यं वद
                        </Typography>


                        {/* BHARAT STATEMENT */}
                        <Typography
                            component="div"
                            sx={{
                                fontSize: {
                                    xs: "1.8rem",
                                    sm: "3.3rem",
                                    md: "4.6rem",
                                },
                                lineHeight: 1.08,
                                fontWeight: 300,
                                letterSpacing: "-0.045em",
                                color: "#24231f",
                            }}
                        >
                            ROOTED IN BHARAT
                        </Typography>


                        {/* VEDA */}
                        <Typography
                            component="div"
                            sx={{
                                mt: {
                                    xs: 1.5,
                                    md: 2,
                                },
                                fontSize: {
                                    xs: "0.65rem",
                                    sm: "0.75rem",
                                    md: "0.85rem",
                                },
                                letterSpacing: {
                                    xs: "0.18em",
                                    md: "0.28em",
                                },
                                fontWeight: 500,
                                color: "#9A6A3A",
                                textTransform: "uppercase",
                            }}
                        >
                            GUIDED BY VEDA
                        </Typography>


                        {/* DESCRIPTION */}
                        <Typography
                            sx={{
                                maxWidth: 600,
                                mx: "auto",
                                mt: {
                                    xs: 4,
                                    md: 5,
                                },
                                fontSize: {
                                    xs: "0.95rem",
                                    md: "1.1rem",
                                },
                                lineHeight: 1.85,
                                color: "#706c64",
                            }}
                        >
                            Essential things for a meaningful life.
                            <br />
                            Simple choices. Honest value.
                        </Typography>


                        {/* CTA */}
                        <Button
                            variant="contained"
                            onClick={() => navigate("/products")}
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                                mt: {
                                    xs: 4,
                                    md: 5,
                                },
                                background: "#292821",
                                color: "#fff",
                                px: 4,
                                py: 1.5,
                                borderRadius: "999px",
                                textTransform: "none",
                                fontSize: "1rem",
                                fontWeight: 500,
                                boxShadow: "none",

                                "&:hover": {
                                    background: "#171712",
                                    boxShadow: "none",
                                },
                            }}
                        >
                            Explore
                        </Button>
                    </Box>
                </Box>

                {/* VASUDHAIVA KUTUMBAKAM */}
                <Card
                    sx={{
                        borderRadius: "24px",

                        // VERY LIGHT BHAGWA / WARM WHITE
                        background: "#FFFEFC",
                        border: "1px solid #F5EBDD",
                        boxShadow: "none",
                        color: "#9A6A3A",

                        transition: "all 0.3s ease",

                        // VERY LIGHT HOVER
                        "&:hover": {
                            background: "#FCF8F2",
                            color: "#8A5A2B",
                            borderColor: "#EBD8C2",
                            transform: "translateY(-5px)",
                            boxShadow:
                                "0 18px 45px rgba(180, 120, 60, 0.10)",
                        },
                    }}
                >
                    <CardContent
                        sx={{
                            py: {
                                xs: 5,
                                md: 7,
                            },
                            px: {
                                xs: 3,
                                sm: 5,
                                md: 7,
                            },
                            textAlign: "center",
                        }}
                    >

                        {/* SMALL LABEL */}
                        <Typography
                            sx={{
                                fontSize: "0.7rem",
                                letterSpacing: "0.28em",
                                textTransform: "uppercase",
                                color: "#C7A078",
                                mb: 2,

                                ".MuiCard-root:hover &": {
                                    color: "#B8895D",
                                },

                                transition: "color 0.3s ease",
                            }}
                        >
                            One Earth · One Family
                        </Typography>


                        {/* MAIN TITLE */}
                        <Typography
                            component="h2"
                            sx={{
                                fontSize: {
                                    xs: "2.2rem",
                                    sm: "3rem",
                                    md: "4rem",
                                },
                                fontWeight: 500,
                                lineHeight: 1.15,
                                letterSpacing: "-0.035em",
                                mb: 3,

                                color: "#9A6A3A",

                                ".MuiCard-root:hover &": {
                                    color: "#8A5A2B",
                                },

                                transition: "color 0.3s ease",
                            }}
                        >
                            वसुधैव कुटुम्बकम्
                        </Typography>


                        {/* MEANING */}
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "1rem",
                                    md: "1.15rem",
                                },
                                fontWeight: 400,
                                lineHeight: 1.8,

                                color: "#B18A62",

                                maxWidth: 650,
                                mx: "auto",

                                ".MuiCard-root:hover &": {
                                    color: "#A77A4F",
                                },

                                transition: "color 0.3s ease",
                            }}
                        >
                            यह पूरी पृथ्वी एक परिवार है।
                        </Typography>


                        {/* DIVIDER */}
                        <Box
                            sx={{
                                width: 45,
                                height: "2px",

                                background: "#F0DFCC",

                                mx: "auto",
                                my: 3,

                                ".MuiCard-root:hover &": {
                                    background: "#E5CCB2",
                                },

                                transition: "background 0.3s ease",
                            }}
                        />


                        {/* DESCRIPTION */}
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "0.9rem",
                                    md: "1rem",
                                },
                                lineHeight: 1.8,

                                // VERY LIGHT TEXT
                                color: "#BDA486",

                                maxWidth: 650,
                                mx: "auto",

                                ".MuiCard-root:hover &": {
                                    color: "#A98A69",
                                },

                                transition: "color 0.3s ease",
                            }}
                        >
                            जहाँ मनुष्य, पशु, पेड़, जल, भूमि और प्रकृति —
                            <br />
                            सभी एक ही परिवार का हिस्सा हैं।
                        </Typography>

                    </CardContent>
                </Card>
                {/* CATEGORIES */}
                <Box sx={{ pb: 12 }}>

                    <Stack
                        direction="row"
                        sx={{
                            mb: 4,
                            px: {
                                xs: 1,
                                md: 0,
                            },
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: "0.75rem",
                                    letterSpacing: "0.18em",
                                    textTransform: "uppercase",
                                    color: "#8a8479",
                                    mb: 1,
                                }}
                            >
                                Our essentials
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: "1.8rem",
                                        md: "2.2rem",
                                    },
                                    fontWeight: 500,
                                    letterSpacing: "-0.025em",
                                }}
                            >
                                What we bring
                            </Typography>
                        </Box>
                    </Stack>

                    <Grid container spacing={2}>

                        {categories.map((category) => (
                            <Grid
                                key={category.title}
                                size={{
                                    xs: 12,
                                    sm: 6,
                                    md: 4,
                                }}
                            >
                                <Card
                                    sx={{
                                        height: "100%",
                                        borderRadius: "20px",
                                        background: "#fff",
                                        border: "1px solid #e9e6df",
                                        boxShadow: "none",
                                        transition: "all 0.25s ease",

                                        "&:hover": {
                                            transform: "translateY(-5px)",
                                            borderColor: "#d6d0c5",
                                            boxShadow:
                                                "0 12px 35px rgba(40,35,25,0.07)",
                                        },
                                    }}
                                >
                                    <CardActionArea
                                        onClick={() =>
                                            navigate(
                                                `/products?category=${category.value}`
                                            )
                                        }
                                        sx={{
                                            height: "100%",
                                            p: 1,
                                        }}
                                    >
                                        <CardContent
                                            sx={{
                                                minHeight: 220,
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "space-between",
                                                p: 3,
                                            }}
                                        >

                                            {/* ICON */}
                                            <Box
                                                sx={{
                                                    width: 52,
                                                    height: 52,
                                                    borderRadius: "50%",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    background: "#f3f1eb",
                                                    color: "#4d493f",
                                                }}
                                            >
                                                {category.icon}
                                            </Box>

                                            {/* TEXT */}
                                            <Box>
                                                <Typography
                                                    sx={{
                                                        fontSize: "1.35rem",
                                                        fontWeight: 500,
                                                        mb: 0.8,
                                                    }}
                                                >
                                                    {category.title}
                                                </Typography>

                                                <Typography
                                                    sx={{
                                                        color: "#817c73",
                                                        fontSize: "0.95rem",
                                                        lineHeight: 1.6,
                                                    }}
                                                >
                                                    {category.description}
                                                </Typography>
                                            </Box>

                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}

                    </Grid>
                </Box>
                <Typography
                    sx={{
                        fontSize: "0.75rem",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "#8a8479",
                        mb: 1,
                    }}
                >
                    Premium living, honestly
                </Typography>
                {/* NATURE IS LUXURY */}
                <Box
                    sx={{
                        py: {
                            xs: 10,
                            md: 16,
                        },
                        textAlign: "center",
                        borderTop: "1px solid #e4e0d8",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "0.75rem",
                            letterSpacing: "0.3em",
                            textTransform: "uppercase",
                            color: "#8a8479",
                            mb: 3,
                        }}
                    >
                        The Grah Udyog way
                    </Typography>

                    <Typography
                        component="h2"
                        sx={{
                            fontSize: {
                                xs: "2.5rem",
                                sm: "3.5rem",
                                md: "5rem",
                            },
                            lineHeight: 1.05,
                            fontWeight: 500,
                            letterSpacing: "-0.045em",
                            mb: 4,
                        }}
                    >
                        Nature is Luxury.
                    </Typography>

                    <Typography
                        sx={{
                            maxWidth: 680,
                            mx: "auto",
                            fontSize: {
                                xs: "1rem",
                                md: "1.2rem",
                            },
                            lineHeight: 1.9,
                            color: "#706c64",
                        }}
                    >
                        Live beside water.
                        <br />
                        Live among trees.
                        <br />
                        Live with fire and animals.
                        <br />
                        Live simply. Live freely.
                    </Typography>

                    <Typography
                        sx={{
                            mt: 5,
                            fontSize: {
                                xs: "1.3rem",
                                md: "1.7rem",
                            },
                            fontWeight: 500,
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Live in luxury.
                    </Typography>
                </Box>

                {/*BHARAT*/}

                {/* BHARAT TAGLINE */}
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: { xs: 1.5, md: 2.5 },
                        my: { xs: 4, md: 6 },
                    }}
                >
                    {/* Left Line */}
                    <Box
                        sx={{
                            flex: 1,
                            height: "1px",
                            background: "#D8CDBE",
                        }}
                    />

                    {/* Center Content */}
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1.5}
                        sx={{
                            flexShrink: 0,
                            textAlign: "center",
                        }}
                    >
                        {/* Small Bharat Symbol */}
                        <Typography
                            sx={{
                                fontSize: { xs: "1.1rem", md: "1.35rem" },
                                opacity: 0.65,
                                lineHeight: 1,
                            }}
                        >
                            🗺️
                        </Typography>

                        <Box>
                            <Typography
                                sx={{
                                    fontSize: { xs: "0.7rem", md: "0.78rem" },
                                    letterSpacing: { xs: "0.12em", md: "0.18em" },
                                    textTransform: "uppercase",
                                    color: "#8B7355",
                                    fontWeight: 500,
                                    lineHeight: 1.5,
                                }}
                            >
                                Finding the lost Bharat in you.
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 0.4,
                                    fontSize: { xs: "0.9rem", md: "1rem" },
                                    color: "#9A5F2C",
                                    fontWeight: 500,
                                    lineHeight: 1.5,
                                }}
                            >
                                ज्ञान और प्रकाश से लिप्त भारत।
                            </Typography>
                        </Box>
                    </Stack>

                    {/* Right Line */}
                    <Box
                        sx={{
                            flex: 1,
                            height: "1px",
                            background: "#D8CDBE",
                        }}
                    />
                </Box>
                {/* HONESTY */}
                <Box
                    sx={{
                        borderTop: "1px solid #e4e0d8",
                        py: 10,
                        textAlign: "center",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: {
                                xs: "1.4rem",
                                md: "2rem",
                            },
                            fontWeight: 400,
                            lineHeight: 1.5,
                            maxWidth: 700,
                            mx: "auto",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        No artificial discounts.
                        <br />
                        No unnecessary noise.
                        <br />

                        <Box
                            component="span"
                            sx={{
                                color: "#756f63",
                            }}
                        >
                            Just honest value.
                        </Box>
                    </Typography>
                </Box>
                {/* OUR BRANDS */}
                <Box
                    sx={{
                        borderTop: "1px solid #e4e0d8",
                        py: {
                            xs: 10,
                            md: 14,
                        },
                    }}
                >
                    <Box
                        sx={{
                            textAlign: "center",
                            mb: 6,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "0.75rem",
                                letterSpacing: "0.3em",
                                textTransform: "uppercase",
                                color: "#8a8479",
                                mb: 2,
                            }}
                        >
                            Two ways of living
                        </Typography>

                        <Typography
                            component="h2"
                            sx={{
                                fontSize: {
                                    xs: "2.2rem",
                                    md: "3.5rem",
                                },
                                lineHeight: 1.1,
                                fontWeight: 500,
                                letterSpacing: "-0.04em",
                            }}
                        >
                            Explore. Eat. Live.
                        </Typography>
                    </Box>

                    <Grid container spacing={2}>

                        {/* THE DALIRAM */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Card
                                sx={{
                                    height: "100%",
                                    borderRadius: "24px",
                                    background: "#eef3ec",
                                    border: "1px solid #dce6d9",
                                    boxShadow: "none",
                                    transition: "all 0.3s ease",

                                    "&:hover": {
                                        background: "#294332",
                                        color: "#fff",
                                        transform: "translateY(-5px)",
                                        boxShadow:
                                            "0 18px 45px rgba(40,65,45,0.16)",
                                    },
                                }}
                            >
                                <CardActionArea
                                    onClick={() => navigate("/the-daliram")}
                                    sx={{
                                        height: "100%",
                                        p: {
                                            xs: 3,
                                            md: 4,
                                        },
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            minHeight: 300,
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                            p: 0,
                                        }}
                                    >
                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontSize: "0.7rem",
                                                    letterSpacing: "0.25em",
                                                    textTransform: "uppercase",
                                                    color: "#718071",
                                                    mb: 2,

                                                    ".MuiCard-root:hover &": {
                                                        color: "rgba(255,255,255,0.6)",
                                                    },
                                                }}
                                            >
                                                Travel
                                            </Typography>

                                            <Typography
                                                component="h3"
                                                sx={{
                                                    fontSize: {
                                                        xs: "2rem",
                                                        md: "2.6rem",
                                                    },
                                                    fontWeight: 500,
                                                    letterSpacing: "-0.04em",
                                                    mb: 2,
                                                }}
                                            >
                                                The Daliram
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    maxWidth: 430,
                                                    fontSize: "1rem",
                                                    lineHeight: 1.8,
                                                    color: "#657365",

                                                    ".MuiCard-root:hover &": {
                                                        color: "rgba(255,255,255,0.72)",
                                                    },
                                                }}
                                            >
                                                Travel slowly.
                                                <br />
                                                Discover places.
                                                <br />
                                                Experience the world beyond the ordinary.
                                            </Typography>
                                        </Box>

                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            spacing={1}
                                            sx={{
                                                mt: 5,
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: "0.85rem",
                                                    fontWeight: 500,
                                                }}
                                            >
                                                Explore The Daliram
                                            </Typography>

                                            <ArrowForwardIcon
                                                sx={{
                                                    fontSize: 18,
                                                    transition: "transform 0.25s ease",

                                                    ".MuiCard-root:hover &": {
                                                        transform: "translateX(5px)",
                                                    },
                                                }}
                                            />
                                        </Stack>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>

                        {/* THE BHAIYALAL  */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Card
                                sx={{
                                    height: "100%",
                                    borderRadius: "24px",
                                    background: "#f1eee5",
                                    border: "1px solid #e5dfd2",
                                    boxShadow: "none",
                                    transition: "all 0.3s ease",

                                    "&:hover": {
                                        background: "#294332",
                                        color: "#fff",
                                        transform: "translateY(-5px)",
                                        boxShadow:
                                            "0 18px 45px rgba(40,65,45,0.16)",
                                    },
                                }}
                            >
                                <CardActionArea
                                    onClick={() =>
                                        navigate("/the-bhaiyalal")
                                    }
                                    sx={{
                                        height: "100%",
                                        p: {
                                            xs: 3,
                                            md: 4,
                                        },
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            minHeight: 300,
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                            p: 0,
                                        }}
                                    >
                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontSize: "0.7rem",
                                                    letterSpacing: "0.25em",
                                                    textTransform: "uppercase",
                                                    color: "#80796c",
                                                    mb: 2,

                                                    ".MuiCard-root:hover &": {
                                                        color: "rgba(255,255,255,0.6)",
                                                    },
                                                }}
                                            >
                                                Food · Nature · Life
                                            </Typography>

                                            <Typography
                                                component="h3"
                                                sx={{
                                                    fontSize: {
                                                        xs: "2rem",
                                                        md: "2.6rem",
                                                    },
                                                    fontWeight: 500,
                                                    letterSpacing: "-0.04em",
                                                    mb: 2,
                                                }}
                                            >
                                                The Bhaiyalal
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    maxWidth: 430,
                                                    fontSize: "1rem",
                                                    lineHeight: 1.8,
                                                    color: "#706c64",

                                                    ".MuiCard-root:hover &": {
                                                        color: "rgba(255,255,255,0.72)",
                                                    },
                                                }}
                                            >
                                                Eat naturally.
                                                <br />
                                                Stay close to nature.
                                                <br />
                                                Live with the land and its beings.
                                            </Typography>
                                        </Box>


                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            spacing={1}
                                            sx={{
                                                mt: 5,
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: "0.85rem",
                                                    fontWeight: 500,
                                                }}
                                            >
                                                Discover The Bhaiyalal Daliram
                                            </Typography>

                                            <ArrowForwardIcon
                                                sx={{
                                                    fontSize: 18,
                                                    transition: "transform 0.25s ease",

                                                    ".MuiCard-root:hover &": {
                                                        transform: "translateX(5px)",
                                                    },
                                                }}
                                            />
                                        </Stack>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>

                    </Grid>
                </Box>
                {/* FLOATING LAND DONATION */}
                <Box
                    sx={{
                        position: "fixed",
                        right: { xs: 12, sm: 20, md: 28 },
                        bottom: { xs: 12, sm: 20, md: 28 },
                        width: {
                            xs: "calc(100% - 24px)",
                            sm: 290,
                            md: 310,
                        },
                        zIndex: 1000,
                    }}
                >
                    <Card
                        sx={{
                            borderRadius: "18px",
                            background: "#F8FCF6",
                            color: "#294332",
                            border: "1px solid #E2EEDF",
                            boxShadow: "0 10px 30px rgba(45,75,50,0.12)",
                            transition: "all 0.25s ease",

                            "&:hover": {
                                background: "#294332",
                                color: "#fff",
                                borderColor: "#294332",
                                transform: "translateY(-3px)",
                                boxShadow: "0 16px 40px rgba(30,55,35,0.22)",
                            },
                        }}
                    >
                        <CardActionArea
                            onClick={() => navigate("/donate-land")}
                            sx={{
                                px: 2.2,
                                py: 1.8,

                                "&:hover .land-arrow": {
                                    transform: "translateX(4px)",
                                },

                                "&:hover .land-subtitle": {
                                    color: "rgba(255,255,255,0.65)",
                                },
                            }}
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1.5}
                            >
                                {/* ICON */}
                                <Box
                                    sx={{
                                        width: 38,
                                        height: 38,
                                        minWidth: 38,
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        background: "#E5F0E2",
                                        color: "#416448",

                                        ".MuiCard-root:hover &": {
                                            background: "rgba(255,255,255,0.12)",
                                            color: "#fff",
                                        },
                                    }}
                                >
                                    <ParkOutlinedIcon sx={{ fontSize: 20 }} />
                                </Box>

                                {/* TEXT */}
                                <Box sx={{ flex: 1 }}>
                                    <Typography
                                        sx={{
                                            fontSize: "0.95rem",
                                            fontWeight: 600,
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        Donate Your Land
                                    </Typography>

                                    <Typography
                                        className="land-subtitle"
                                        sx={{
                                            mt: 0.4,
                                            fontSize: "0.72rem",
                                            color: "#718373",
                                            transition: "color 0.25s ease",
                                        }}
                                    >
                                        Land only for trees · Eternally
                                    </Typography>
                                </Box>

                                {/* ARROW */}
                                <ArrowForwardIcon
                                    className="land-arrow"
                                    sx={{
                                        fontSize: 18,
                                        transition: "transform 0.25s ease",
                                    }}
                                />
                            </Stack>
                        </CardActionArea>
                    </Card>
                </Box>

            </Container>
        </Box>
    );
}