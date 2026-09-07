import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Products from "../pages/product/Products";
import ProductDetails from "../pages/product/ProductDetails";

import Cart from "../pages/cart/Cart";
import Address from "../pages/address/Address";

import Orders from "../pages/order/Orders";
import OrderDetails from "../pages/order/OrderDetails";

import Dashboard from "../pages/admin/Dashboard";
import AdminProducts from "../pages/admin/Products";
import AdminInventory from "../pages/admin/Inventory";
import AdminOrders from "../pages/admin/Orders";
import AdminOrderDetails from "../pages/admin/OrderDetails";
import Home from "../pages/home/Home";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Home */}
            <Route
                path="/"
                element=
                {<Home />}

            />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Product */}
            <Route path="/products" element={<Products />} />
            <Route
                path="/products/:id"
                element={<ProductDetails />}
            />

            {/* Cart */}
            <Route path="/cart" element={<Cart />} />

            {/* Address */}
            <Route path="/address" element={<Address />} />

            {/* Orders */}
            <Route path="/orders" element={<Orders />} />
            <Route
                path="/orders/:id"
                element={<OrderDetails />}
            />

            {/* Admin */}
            <Route path="/admin" element={<Dashboard />} />
            <Route
                path="/admin/products"
                element={<AdminProducts />}
            />
            <Route
                path="/admin/inventory"
                element={<AdminInventory />}
            />
            <Route
                path="/admin/orders"
                element={<AdminOrders />}
            />
            <Route
                path="/admin/orders/:id"
                element={<AdminOrderDetails />}
            />

        </Routes>
    );
};

export default AppRoutes;