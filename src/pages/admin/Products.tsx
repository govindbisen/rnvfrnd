import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const Products = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getProducts = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/product");

            setProducts(response.data.products);
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Failed to fetch products"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    if (loading) {
        return <h2>Loading products...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <div>
            <h1>Products</h1>

            {products.length === 0 ? (
                <p>No products found</p>
            ) : (
                <div>
                    {products.map((product) => (
                        <div key={product._id}>
                            <h2>{product.title}</h2>

                            <p>{product.name}</p>

                            <p>
                                Category:{" "}
                                {product.category.join(", ")}
                            </p>

                            <p>
                                Price: ₹{product.price}
                            </p>

                            <p>
                                {product.inStock
                                    ? "In Stock"
                                    : "Out of Stock"}
                            </p>

                            <button
                                onClick={() =>
                                    navigate(
                                        `/products/${product._id}`
                                    )
                                }
                            >
                                View Details
                            </button>

                            <hr />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;