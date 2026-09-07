import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    Container,
    Divider,
    FormControlLabel,
    Grid,
    TextField,
    Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import api from "../../services/api";

interface Address {
    _id: string;
    userId: string;
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    isDefault: boolean;
}

interface AddressForm {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    isDefault: boolean;
}

const initialForm: AddressForm = {
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    isDefault: false,
};

const Address = () => {
    const navigate = useNavigate();

    const handleCreateOrder = async () => {
        if (!selectedAddressId) {
            setError("Please select an address");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await api.post("/order", {
                addressId: selectedAddressId,
            });

            const orderId = response.data.order._id;

            navigate(`/orders/${orderId}`);

        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Failed to create order"
            );
        } finally {
            setLoading(false);
        }
    };

    const [addresses, setAddresses] = useState<Address[]>([]);
    const [selectedAddressId, setSelectedAddressId] =
        useState("");

    const [showForm, setShowForm] = useState(false);
    const [editingAddressId, setEditingAddressId] =
        useState<string | null>(null);

    const [form, setForm] =
        useState<AddressForm>(initialForm);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");


    // GET ADDRESSES
    const getAddresses = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/address");

            const addressList: Address[] =
                response.data.addresses;

            setAddresses(addressList);

            // Select default address automatically
            const defaultAddress = addressList.find(
                (address) => address.isDefault
            );

            if (defaultAddress) {
                setSelectedAddressId(
                    defaultAddress._id
                );
            } else if (addressList.length > 0) {
                setSelectedAddressId(
                    addressList[0]._id
                );
            }

        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Failed to fetch addresses"
            );
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        getAddresses();
    }, []);


    // FORM INPUT
    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };


    // OPEN ADD FORM
    const handleAddAddress = () => {
        setForm(initialForm);
        setEditingAddressId(null);
        setShowForm(true);
        setError("");
        setMessage("");
    };


    // OPEN EDIT FORM
    const handleEditAddress = (
        address: Address
    ) => {
        setForm({
            fullName: address.fullName,
            phone: address.phone,
            addressLine1: address.addressLine1,
            addressLine2:
                address.addressLine2 || "",
            city: address.city,
            state: address.state,
            pincode: address.pincode,
            country: address.country,
            isDefault: address.isDefault,
        });

        setEditingAddressId(address._id);
        setShowForm(true);
        setError("");
        setMessage("");
    };


    // CANCEL FORM
    const handleCancelForm = () => {
        setShowForm(false);
        setEditingAddressId(null);
        setForm(initialForm);
    };


    // SAVE ADDRESS
    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        try {
            setSaving(true);
            setError("");
            setMessage("");

            if (editingAddressId) {
                const response = await api.put(
                    `/address/${editingAddressId}`,
                    form
                );

                setMessage(
                    response.data.message ||
                    "Address updated successfully"
                );
            } else {
                const response = await api.post(
                    "/address",
                    form
                );

                setMessage(
                    response.data.message ||
                    "Address created successfully"
                );
            }

            setShowForm(false);
            setEditingAddressId(null);
            setForm(initialForm);

            await getAddresses();

        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Failed to save address"
            );
        } finally {
            setSaving(false);
        }
    };


    // DELETE ADDRESS
    const handleDeleteAddress = async (
        addressId: string
    ) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this address?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");
            setMessage("");

            await api.delete(
                `/address/${addressId}`
            );

            if (selectedAddressId === addressId) {
                setSelectedAddressId("");
            }

            setMessage(
                "Address deleted successfully"
            );

            await getAddresses();

        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Failed to delete address"
            );
        }
    };


    // PROCEED TO ORDER
    const handleProceedToOrder = () => {
        if (!selectedAddressId) {
            setError(
                "Please select an address"
            );

            return;
        }

        navigate(
            `/orders/create?addressId=${selectedAddressId}`
        );
    };


    if (loading) {
        return (
            <Container sx={{ py: 10 }}>
                <Typography
                    textAlign="center"
                >
                    Loading addresses...
                </Typography>
            </Container>
        );
    }


    return (
        <Container
            maxWidth="lg"
            sx={{ py: 5 }}
        >

            {/* HEADER */}

            <Box
                sx={{
                    display: "flex",
                    justifyContent:
                        "space-between",
                    alignItems: "center",
                    mb: 4,
                    flexWrap: "wrap",
                    gap: 2,
                }}
            >
                <Box>
                    <Button
                        startIcon={
                            <ArrowBackIcon />
                        }
                        onClick={() =>
                            navigate("/cart")
                        }
                        sx={{ mb: 1 }}
                    >
                        Back to Cart
                    </Button>

                    <Typography
                        variant="h4"
                        fontWeight="bold"
                    >
                        Select Address
                    </Typography>

                    <Typography
                        color="text.secondary"
                    >
                        Choose where you want
                        your order delivered
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddAddress}
                >
                    Add New Address
                </Button>
            </Box>


            {/* MESSAGES */}

            {error && (
                <Alert
                    severity="error"
                    sx={{ mb: 3 }}
                >
                    {error}
                </Alert>
            )}

            {message && (
                <Alert
                    severity="success"
                    sx={{ mb: 3 }}
                >
                    {message}
                </Alert>
            )}


            {/* ADD / EDIT FORM */}

            {showForm && (
                <Card sx={{ mb: 4 }}>
                    <CardContent>
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            gutterBottom
                        >
                            {editingAddressId
                                ? "Edit Address"
                                : "Add New Address"}
                        </Typography>

                        <Divider
                            sx={{ mb: 3 }}
                        />

                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                        >
                            <Grid
                                container
                                spacing={2}
                            >

                                <Grid
                                    size={{
                                        xs: 12,
                                        md: 6,
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        label="Full Name"
                                        name="fullName"
                                        value={
                                            form.fullName
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />
                                </Grid>


                                <Grid
                                    size={{
                                        xs: 12,
                                        md: 6,
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        label="Phone"
                                        name="phone"
                                        value={
                                            form.phone
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />
                                </Grid>


                                <Grid
                                    size={12}
                                >
                                    <TextField
                                        fullWidth
                                        label="Address Line 1"
                                        name="addressLine1"
                                        value={
                                            form.addressLine1
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />
                                </Grid>


                                <Grid
                                    size={12}
                                >
                                    <TextField
                                        fullWidth
                                        label="Address Line 2"
                                        name="addressLine2"
                                        value={
                                            form.addressLine2
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />
                                </Grid>


                                <Grid
                                    size={{
                                        xs: 12,
                                        md: 4,
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        label="City"
                                        name="city"
                                        value={
                                            form.city
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />
                                </Grid>


                                <Grid
                                    size={{
                                        xs: 12,
                                        md: 4,
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        label="State"
                                        name="state"
                                        value={
                                            form.state
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />
                                </Grid>


                                <Grid
                                    size={{
                                        xs: 12,
                                        md: 4,
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        label="Pincode"
                                        name="pincode"
                                        value={
                                            form.pincode
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />
                                </Grid>


                                <Grid
                                    size={{
                                        xs: 12,
                                        md: 6,
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        label="Country"
                                        name="country"
                                        value={
                                            form.country
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />
                                </Grid>


                                <Grid
                                    size={12}
                                >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={
                                                    form.isDefault
                                                }
                                                onChange={(
                                                    event
                                                ) =>
                                                    setForm(
                                                        (
                                                            previous
                                                        ) => ({
                                                            ...previous,
                                                            isDefault:
                                                                event
                                                                    .target
                                                                    .checked,
                                                        })
                                                    )
                                                }
                                            />
                                        }
                                        label="Set as default address"
                                    />
                                </Grid>

                            </Grid>


                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 2,
                                    mt: 3,
                                }}
                            >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={saving}
                                >
                                    {saving
                                        ? "Saving..."
                                        : editingAddressId
                                            ? "Update Address"
                                            : "Save Address"}
                                </Button>

                                <Button
                                    variant="outlined"
                                    onClick={
                                        handleCancelForm
                                    }
                                >
                                    Cancel
                                </Button>
                            </Box>

                        </Box>
                    </CardContent>
                </Card>
            )}


            {/* NO ADDRESSES */}

            {addresses.length === 0 && (
                <Card>
                    <CardContent
                        sx={{
                            textAlign: "center",
                            py: 8,
                        }}
                    >
                        <ShoppingBagIcon
                            sx={{
                                fontSize: 60,
                                color:
                                    "text.secondary",
                            }}
                        />

                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            sx={{ mt: 2 }}
                        >
                            No addresses found
                        </Typography>

                        <Typography
                            color="text.secondary"
                            sx={{
                                mt: 1,
                                mb: 3,
                            }}
                        >
                            Add an address to
                            continue with your
                            order.
                        </Typography>

                        <Button
                            variant="contained"
                            startIcon={
                                <AddIcon />
                            }
                            onClick={
                                handleAddAddress
                            }
                        >
                            Add Address
                        </Button>
                    </CardContent>
                </Card>
            )}


            {/* ADDRESS LIST */}

            {addresses.length > 0 && (
                <>
                    <Grid
                        container
                        spacing={3}
                    >
                        {addresses.map(
                            (address) => (
                                <Grid
                                    key={
                                        address._id
                                    }
                                    size={{
                                        xs: 12,
                                        md: 6,
                                    }}
                                >
                                    <Card
                                        sx={{
                                            height:
                                                "100%",
                                            border:
                                                selectedAddressId ===
                                                    address._id
                                                    ? "2px solid"
                                                    : "1px solid",
                                            borderColor:
                                                selectedAddressId ===
                                                    address._id
                                                    ? "primary.main"
                                                    : "divider",
                                        }}
                                    >
                                        <CardContent>

                                            <Box
                                                sx={{
                                                    display:
                                                        "flex",
                                                    justifyContent:
                                                        "space-between",
                                                    alignItems:
                                                        "flex-start",
                                                }}
                                            >

                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={
                                                                selectedAddressId ===
                                                                address._id
                                                            }
                                                            onChange={() =>
                                                                setSelectedAddressId(
                                                                    address._id
                                                                )
                                                            }
                                                        />
                                                    }
                                                    label={
                                                        <Typography
                                                            fontWeight="bold"
                                                        >
                                                            Select
                                                        </Typography>
                                                    }
                                                />

                                                {address.isDefault && (
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color:
                                                                "success.main",
                                                            fontWeight:
                                                                "bold",
                                                        }}
                                                    >
                                                        Default
                                                    </Typography>
                                                )}

                                            </Box>


                                            <Typography
                                                variant="h6"
                                                fontWeight="bold"
                                                sx={{
                                                    mt: 1,
                                                }}
                                            >
                                                {
                                                    address.fullName
                                                }
                                            </Typography>


                                            <Typography
                                                sx={{
                                                    mt: 1,
                                                }}
                                            >
                                                {
                                                    address.phone
                                                }
                                            </Typography>


                                            <Typography
                                                color="text.secondary"
                                                sx={{
                                                    mt: 1,
                                                }}
                                            >
                                                {
                                                    address.addressLine1
                                                }
                                                {address.addressLine2 &&
                                                    `, ${address.addressLine2}`}
                                                <br />
                                                {
                                                    address.city
                                                }
                                                ,{" "}
                                                {
                                                    address.state
                                                }{" "}
                                                -{" "}
                                                {
                                                    address.pincode
                                                }
                                                <br />
                                                {
                                                    address.country
                                                }
                                            </Typography>


                                            <Divider
                                                sx={{
                                                    my: 2,
                                                }}
                                            />


                                            <Box
                                                sx={{
                                                    display:
                                                        "flex",
                                                    gap: 1,
                                                }}
                                            >
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    startIcon={
                                                        <EditIcon />
                                                    }
                                                    onClick={() =>
                                                        handleEditAddress(
                                                            address
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </Button>

                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    size="small"
                                                    startIcon={
                                                        <DeleteIcon />
                                                    }
                                                    onClick={() =>
                                                        handleDeleteAddress(
                                                            address._id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </Button>
                                            </Box>

                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        )}
                    </Grid>


                    {/* PROCEED */}

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
                                Delivery Address
                            </Typography>

                            <Divider
                                sx={{ my: 2 }}
                            />

                            <Typography
                                color="text.secondary"
                                sx={{ mb: 3 }}
                            >
                                {selectedAddressId
                                    ? "Address selected. You can continue to place your order."
                                    : "Please select an address to continue."}
                            </Typography>

                            <Button
                                variant="contained"
                                fullWidth
                                disabled={!selectedAddressId || loading}
                                onClick={handleCreateOrder}
                            >
                                {loading ? "Creating Order..." : "Proceed to Order"}
                            </Button>

                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{ mt: 2 }}
                                onClick={() =>
                                    navigate(
                                        "/cart"
                                    )
                                }
                            >
                                Back to Cart
                            </Button>
                        </CardContent>
                    </Card>
                </>
            )}

        </Container>
    );
};

export default Address;